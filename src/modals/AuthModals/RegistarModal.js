import React,{useState} from "react";
import { Modal, Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { inject, observer } from "mobx-react";
import styles from "./AuthModal.module.scss";

const RegistarModal = (props) => {
  const { authStore, visRegistarModal, setVisRegistarModal , routerHistory } = props;
  const [err, setErr] = useState('');
  const onFinish = async (values) => {
    await authStore.signUp(values.email,values.password).then(()=>{
        setVisRegistarModal(false)
        routerHistory.push('/auctions')
    }).catch((err)=>{
      if(!err.description.rules[0].verified){
        setErr('הסיסמא צריכה להכיל יותר מ8 תווים')
      }else{
        setErr('הסיסמה צריכה להכיל לפחות אות גדולה אחת אותיות קטנות ומספרים')
      }
    })
    
  };
  return (
    <Modal
      title="הרשמה למערכת"
      visible={visRegistarModal}
      footer={null}
      onCancel={() => setVisRegistarModal(false)}
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
            הרשם
          </Button>
          <div style={{color: 'red'}}>{err}</div>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default inject("authStore","routerHistory")(observer(RegistarModal));
