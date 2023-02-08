import { Button, Form, Input, Radio } from 'antd';
import React from 'react';
import CreatePDF from './generatePDF';

export default function RegistrationForm() {
  const onFinish = async (values) => {
    const pdf = await CreatePDF(values);

    const blob = new Blob([pdf, { type: 'application/octet-stream' }]);
    const urlDownload = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = urlDownload;
    a.download = 'exemplo.pdf';
    a.click();

    setTimeout(function () {
      window.URL.revokeObjectURL(urlDownload);
    }, 200);
  };

  const RenderItem = ({ label, name }) => (
    <Form.Item
      label={label}
      name={name}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '40px',
        width: '80%',
        color: 'white',
      }}
      rules={[
        {
          required: true,
          message: 'Campo obrigatório!',
        },
      ]}
    >
      <Input />
    </Form.Item>
  );

  return (
    <Form
      onFinish={onFinish}
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <RenderItem label='Cliente' name='costumer' />
      <RenderItem label='Endereço' name='address' />
      <RenderItem label='Contato' name='contact' />
      <RenderItem label='Email' name='email' />
      <div>DADOS DA VENDA</div>
      <RenderItem label='Valor' name='value' />
      <Form.Item
        label='Forma de pagamento'
        name='payment'
        rules={[
          {
            required: true,
            message: 'Campo obrigatório!',
          },
        ]}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '40px',
          width: '80%',
          color: 'white',
        }}
      >
        <Radio.Group
          style={{
            display: 'flex',
            flexDirection: 'column',
            paddingTop: '10px',
            color: 'white',
          }}
        >
          <Radio style={{ marginBottom: '10px', color: 'white' }} value={1}>
            {' À vista'}
          </Radio>
          <Radio style={{ marginBottom: '10px', color: 'white' }} value={2}>
            {' '}
            Parcelado
          </Radio>
          <Radio style={{ marginBottom: '10px', color: 'white' }} value={3}>
            {' '}
            Cartão
          </Radio>
          <Radio style={{ marginBottom: '10px', color: 'white' }} value={4}>
            {' '}
            Crediário
          </Radio>
        </Radio.Group>
      </Form.Item>

      <Button htmlType='submit' type='primary'>
        Gerar Ficha
      </Button>
    </Form>
  );
}
