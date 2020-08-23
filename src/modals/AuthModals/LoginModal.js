import React, {useState} from "react";
import { Modal, Form, Input, Button, Checkbox } from "antd";
import {LockOutlined, MailOutlined } from "@ant-design/icons";
import { inject, observer } from "mobx-react";
import styles from "./AuthModal.module.scss";
import { ReactComponent as GoogleIcon } from '../../resoucres/google.svg'
import { ReactComponent as FaceBookIcon } from '../../resoucres/facebook.svg'

const LoginModal = (props) => {
  const { authStore, visloginModal, setVisLoginModal , routerHistory } = props;
  const [err, setErr] = useState('');
  const onFinish = async (values) => {
    setErr('');
    await authStore.signIn(values.email,values.password).then(()=>{
        setVisLoginModal(false)
        routerHistory.push('/auctions')
    }).catch(()=>{
      setErr('שם משתמש ו/או סיסמא שגויים')
    })
  };
  const Social = async (social) =>{
    window.location.href = `https://sls-project.eu.auth0.com/authorize?response_type=code&client_id=${process.env.REACT_APP_AUTH0_CLIENT_ID}&connection=${social}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&scope=openid profile`
  }
  return (
    <Modal
      title="כניסה למערכת"
      visible={visloginModal}
      footer={null}
      onCancel={() => setVisLoginModal(false)}
    >
      <Form
        name="normal_login"
        className={styles.loginForm}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "אנא הכנס מייל",
            },
          ]}
        >
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="אימייל"
            size="large"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "אנא הכנס סיסמה",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="סיסמא"
            size="large"
          />
        </Form.Item>
        <Form.Item>
          <a className={styles.loginFormForgot} href="">
            שכחתי סיסמה
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className={styles.loginFormButton}
          >
            התחבר
          </Button>
          <div style={{color: 'red'}}>{err}</div>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-around',marginTop: '10px'}}>
            <GoogleIcon width={30} height={30}  onClick={()=> Social('google-oauth2')}/>
            <FaceBookIcon width={30} height={30}  onClick={()=> Social('facebook')}/>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default inject("authStore","routerHistory")(observer(LoginModal));
