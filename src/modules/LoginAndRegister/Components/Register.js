import React, { useState } from "react";
import { Form, Input, Button, DatePicker, Radio } from "antd";
import checkError from "../../../libraries/CheckError";

const tailLayout = {
  wrapperCol: { offset: 7, span: 15 },
};

const layout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 15 },
};

const config = {
  rules: [
    {
      type: "object",
      required: true,
      message: "Vui lòng chọn ngày sinh!",
    },
  ],
};

const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];

const Register = (props) => {
  const [form] = Form.useForm();
  const [valueGender, setValueGender] = useState(1);
  const [valueDate, setValueDate] = useState("");

  // const onFinish = (values, fieldsValue) => {
  //   console.log("Received values of form: ", values);
  //   const date = {
  //     ...fieldsValue,
  //     "date-picker": fieldsValue["date-picker"].format("YYYY-MM-DD"),
  //   };
  //   console.log("Received values of form: ", date);
  // };
  function handleChangeGender(e) {
    console.log(e.target.value);
    setValueGender(e.target.value);
  }
  function handleSelectDate(date, dateString) {
    setValueDate(dateString);
  }
  async function onFinish(values) {
    console.log("Values ======> ", values);
    // const { name, email, phone, password, address } = values;
    // const date = valueDate;
    // const gender = valueGender;
    // console.log(name, email, phone, password, address, gender, date);
    const { registerAccount, history } = props;
    const result = await registerAccount(values);
    console.log(result);
    if (!result || !result.status === 200) {
      const error = result.error;
      console.log(result.error);
      checkError(error.error);
    } else {
      history.push("/");
    }
  }
  function validatePassword(rule, value, callback) {
    if (value.length >= 8) {
      callback();
    } else {
      callback("Mật khẩu phải từ 8 ký tự trở lên!");
    }
  }

  return (
    <Form
      {...layout}
      form={form}
      name="register"
      onFinish={onFinish}
      scrollToFirstError
    >
      <Form.Item
        name="name"
        label={<span>Họ tên</span>}
        rules={[
          {
            required: true,
            message: "Vui lòng nhập họ tên!",
            whitespace: true,
          },
        ]}
      >
        <Input placeholder="Nhập họ tên" />
      </Form.Item>

      <Form.Item
        name="phone"
        label="Số điện thoại"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập số điện thoại của bạn!",
          },
        ]}
      >
        <Input placeholder="Nhập số điện thoại" />
      </Form.Item>
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: "email",
            message: "E-mail không hợp lệ!",
          },
          {
            required: true,
            message: "Vui lòng nhập e-mail!",
          },
        ]}
      >
        <Input placeholder="Nhập e-mail" />
      </Form.Item>

      <Form.Item
        name="password"
        label="Mật khẩu"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập mật khẩu!",
          },
          {
            validator: validatePassword,
          },
        ]}
        hasFeedback
      >
        <Input.Password placeholder="Mật khẩu từ 8 ký tự trở lên" />
      </Form.Item>

      <Form.Item
        name="confirmPassword"
        label="Xác nhận mật khẩu"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Vui lòng xác nhận mật khẩu của bạn!",
          },

          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }

              return Promise.reject("Hai mật khẩu mà bạn đã nhập không khớp!");
            },
          }),
        ]}
      >
        <Input.Password placeholder="Xác nhận mật khẩu" />
      </Form.Item>

      <Form.Item
        name="address"
        label={<span>Địa chỉ</span>}
        rules={[
          {
            required: true,
            message: "Vui lòng nhập địa chỉ!",
            whitespace: true,
          },
        ]}
      >
        <Input placeholder="Nhập địa chỉ" />
      </Form.Item>
      <Form.Item name="gender" label={<span>Giới tính</span>}>
        <Radio.Group>
          <Radio value={0}>Nam</Radio>
          <Radio value={1}>Nữ</Radio>
          <Radio value={2}>Khác</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item name="date-picker" label="Ngày sinh" {...config}>
        <DatePicker
          // onChange={handleSelectDate}
          placeholder="Chọn ngày sinh"
          style={{ width: "100%" }}
          // format={dateFormatList}
        />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button style={{ width: "100%" }} type="primary" htmlType="submit">
          Đăng ký
        </Button>
      </Form.Item>
    </Form>
  );
};
export default Register;
