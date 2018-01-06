import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';
import Wrap from '../src/index';
import './style.less';

const FormItem = Form.Item;
const NumInput = Wrap.create(Input);

@Form.create()
class CashForm extends Component {
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) return;
      this.props.onSubmit(values);
    });
  }

  render() {
    const { total = 0, form } = this.props;

    return (
      <Form layout="horizontal" className="salelayout-common-form take-cash-form" onSubmit={ (e) => this.handleSubmit(e) }>
        <p>当前总收入：{total}元</p>
        <FormItem
          className="form-item"
          label="金额"
        >
          { form.getFieldDecorator('price', {
            rules: [
              { required: true, message: '请输入金额' },
              {
                validator: (rule, value, callback) => {
                  let result;
                  if (value) {
                    if (/^\d+(\.\d{0,2})?$/.test(value)) {
                      if (value > total) {
                        result = '不能超过当前收入';
                      }
                      if (value === 0) {
                        result = '请输入大于0的数字';
                      }
                    } else {
                      result = '请输入正确的数字，最多保留两位小数';
                    }
                  }
                  callback(result);
                },
              },
              { initialValue: '' },
            ],
          })(<NumInput style={{ width: '120px' }} placeholder="请输入" />)
        }
        </FormItem>

        <div className="form-item">
          <Button type="primary" htmlType="submit" size="large">确 认</Button>
        </div>
      </Form>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '1',
      disabled: false,
    };
  }

  render() {
    const { value, disabled } = this.state;
    return (
      <div>
        <CashForm
          total={100}
          onSubmit={(values) => { console.log(values); }}
        />

        <NumInput
          onChange={(value) => { this.setState({value}); console.log('change');}}
          value={value}
          disabled={disabled}
          onClick={() => { console.log('click'); }}
        />

        <button onClick={() => { this.setState({ value: '+1s', disabled: !disabled }); }}> +1s </button>
      </div>
    );
  }

}

export default App;
