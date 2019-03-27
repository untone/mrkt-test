import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getRequest, clearError, clearPassword } from './actions';

class Signin extends Component {
  static propTypes = {
    signinLoading: PropTypes.bool,
    signinError: PropTypes.bool,
    passwordReset: PropTypes.bool,
    name: PropTypes.string,
    getRequest: PropTypes.func,
    clearError: PropTypes.func,
    clearPassword: PropTypes.func
  };

  state = {
    login: '',
    password: ''
  };

  handleChange = ({target: {name, value}}) => {
    this.setState({
      ...this.state,
      [name]: value
    }, () => {
      this.props.signinError && this.props.clearError();
      (name = 'login' && value === '') && this.props.clearPassword();
    });
  };

  handleSubmit = ({nativeEvent}) => {
    nativeEvent.preventDefault();
    this.props.getRequest({name: 'signin', data: this.state});
  };

  handleRemind = () => {
    this.props.getRequest({name: 'password', data: {login: this.state.login}});
  };

  render() {
    const { login, password } = this.state;
    const { name, passwordReset, signinLoading, signinError } = this.props;
    const disabled = signinError || (!login.length || !password.length) || signinLoading;
    const active = (login.length || password.length) && !signinLoading;
    if (name.length > 0) {
      return (
      <div className='signin is-ready'>
        <div className='signin-content'>
          <div className='signin-welcome'>
            Добро пожаловать,<br/><b>{name}</b>!
          </div>
        </div>
      </div>
      );
    }
    return (
      <div className='signin is-ready'>
        <div className='signin-content'>
          <form onSubmit={event => this.handleSubmit(event)}>
            <div className='signin-main'>
              <h2>Вход</h2>
              <div className='signin-row'>
                <label className='input'>
                  <span className='input-label'>
                    Эл. почта или телефон
                  </span>
                  <span className='input-wrapper'>
                    <input
                      className='input-field'
                      autoComplete='off'
                      name='login'
                      type='text'
                      required
                      onChange={event => this.handleChange(event)}
                      value={login}/>
                    <span className='input-focus'/>
                  </span>
                </label>
              </div>
              <div className='signin-row'>
                <label className='input'>
                  <span className='input-label'>
                    Пароль
                  </span>
                  <span className='input-wrapper'>
                    <input
                      className='input-field'
                      autoComplete='off'
                      name='password'
                      type={passwordReset ? 'text' : 'password'}
                      required
                      disabled={passwordReset}
                      onChange={event => this.handleChange(event)}
                      value={passwordReset ? 'Ссылка отправлена на почту' : password}/>
                    <span className='input-focus'/>
                    <span
                      className={`signin-remind ${active ? 'active' : ''}`}
                      onClick={active ? this.handleRemind : null}>
                      Напомнить
                    </span>
                  </span>
                </label>
              </div>
            </div>
            <div className='signin-bottom'>
              <button
                className='btn btn--blue btn--big'
                type='submit'
                disabled={disabled}>
                Войти на площадку
              </button>
            </div>
            {signinError &&
              <span className='signin-error'>
                Неправильный логин или пароль
              </span>
            }
          </form>
        </div>
      </div>
    );
  }
};

const mapStateToProps = state => {
  return { state };
};

export default connect(
  mapStateToProps,
  { getRequest, clearError, clearPassword }
)(Signin);
