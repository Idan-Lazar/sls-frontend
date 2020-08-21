import React from "react";
import { Modal, Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { inject, observer } from "mobx-react";
import queryString from 'query-string';
import "./LoginModal.scss";
import Axios from 'axios';

const LoginModal = (props) => {
  const { authStore, visloginModal, setVisLoginModal , routerHistory } = props;
  const onFinish = async (values) => {
    await authStore.signIn(values.email,values.password,values.remember).then(()=>{
        setVisLoginModal(false)
    })
  };
  const Social = async (social) =>{
    window.location.href = `https://sls-project.eu.auth0.com/authorize?response_type=code&client_id=ebvnIdewrkmc55kM5swdczoeMQbKG6Ru&connection=${social}&redirect_uri=${procces.env.REDIRECT_URI}&scope=openid%20name%20email`
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
        className="login-form"
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
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>זכור אותי</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            שכחתי סיסמה
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            התחבר
          </Button>
          או <div onClick={()=> Social('github')}>הרשם</div>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default inject("authStore","routerHistory")(observer(LoginModal));
