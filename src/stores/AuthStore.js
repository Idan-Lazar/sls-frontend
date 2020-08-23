import { observable, action } from 'mobx';
import Axios from 'axios';
import OverlayStore from './OverlayStore';
import qs from 'querystring'
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';


const axios = Axios.create({
  baseURL: process.env.REACT_APP_AUTH0,
});
const headers = {
  "Content-Type": "application/x-www-form-urlencoded"
}

class AuthStore {
  
  @observable token = Cookies.get('token');
  @observable claims;
  @observable sub = Cookies.get('sub');;
  @action
  async signIn(email,password) {
    try {
      OverlayStore.setLoadingSpinner(true);
      const result = await axios.post('/oauth/token',qs.stringify({
        client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
        username : email,
        password,
        grant_type: 'password',
        scope: 'openid profile'
      }),headers);
      this.setTokenAndClaims(result.data.id_token);
      OverlayStore.setLoadingSpinner(false);
    } catch (error) {
      OverlayStore.setLoadingSpinner(false);
      console.error(error);
      throw error
    }
  }
  @action
  async socialSignIn(code) {
    try {
      OverlayStore.setLoadingSpinner(true);
      const result = await axios.post('/oauth/token',qs.stringify({
        client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
        client_secret : process.env.REACT_APP_AUTH0_CLIENT_SECRET,
       redirect_uri: process.env.REACT_APP_REDIRECT_URI,
        grant_type: 'authorization_code',
        code,
        scope: 'openid'
      }),headers);
      this.setTokenAndClaims(result.data.id_token);
      OverlayStore.setLoadingSpinner(false);
    } catch (error) {
      OverlayStore.setLoadingSpinner(false);
      console.error(error);
      throw error
    }
  }

  @action
  async signUp(email,password) {
    try {
      await axios.post('/dbconnections/signup',{
        client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
        email,
        password,
        connection: 'Username-Password-Authentication'
      }).then(async ()=>{
        await this.signIn(email,password)
      }).catch(error => {
        throw error.response.data
    });
    } catch (error) {
      throw error
    }
  }

  @action
  signOut() {
    this.token = null;
    Cookies.remove('token')
    Cookies.remove('sub')
    this.sub = null
  }

  @action
  setTokenAndClaims(token) {
    this.token = token;
    let decoded = jwt_decode(this.token);
    this.claims = decoded;
    this.sub = decoded.sub;
    Cookies.set('token',this.token);
    Cookies.set('sub', decoded.sub);
  }

}

export default new AuthStore();