import React from 'react'
import ReactDOM from 'react-dom/client'
import { Auth0Provider } from "@auth0/auth0-react";

import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Auth0Provider
  domain="dev-ik2nc3kw5onote3v.us.auth0.com"
  clientId="V91mRwkkG9JW4F0YAaRA2XLkPWFaOoIg"
  redirectUri={window.location.origin}
>
  <App />
</Auth0Provider>
)
