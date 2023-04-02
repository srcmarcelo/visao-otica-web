import { Button, DatePicker, Form, Input, InputNumber, Radio } from 'antd';
import React, { useState } from 'react';
import CreatePDF from './generatePDF';

export default function InstallmentsForm() {
  const onFinish = async (values) => {
    const pdf = await CreatePDF(values);

    const blob = new Blob([pdf, { type: 'application/octet-stream' }]);
    const urlDownload = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = urlDownload;
    a.download = `parcelas_${values.code}.pdf`;
    a.click();

    setTimeout(function () {
      window.URL.revokeObjectURL(urlDownload);
    }, 200);
  };

  const RenderValueInput = ({ label, name }) => {
    return (
      <Form.Item
        label={label}
        name={name}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '10px',
          width: '80%',
        }}
        requiredMark='optional'
        rules={[
          {
            required: true,
            message: 'Campo obrigatório!',
          },
        ]}
      >
        <InputNumber
          style={{
            width: 250,
          }}
          step='0.01'
          prefix='R$'
          stringMode
        />
      </Form.Item>
    );
  };

  const RenderDateItem = ({ label, name }) => (
    <Form.Item
      label={label}
      name={name}
      requiredMark='optional'
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
        margin: '15px 10px',
        width: '100%',
      }}
    >
      <DatePicker style={{ width: '250px' }} placeholder='Selecione uma data' />
    </Form.Item>
  );

  const RenderRadio = ({ label, value }) => (
    <Radio style={{ marginBottom: '10px' }} value={value}>
      {` ${label}`}
    </Radio>
  );

  const RenderRadioGroupItem = ({ label, name, items }) => (
    <Form.Item
      label={label}
      name={name}
      requiredMark='optional'
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
        width: '80%',
      }}
    >
      <Radio.Group
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {items.map((item, index) => (
          <RenderRadio
            key={`${label}_${item}_${index}`}
            label={item}
            value={index + 1}
          />
        ))}
      </Radio.Group>
    </Form.Item>
  );

  const RenderInputNumber = ({ label, name }) => {
    return (
      <Form.Item
        label={label}
        name={name}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '10px',
          width: '80%',
        }}
        requiredMark='optional'
        rules={[
          {
            required: true,
            message: 'Campo obrigatório!',
          },
        ]}
      >
        <InputNumber
          style={{
            width: 250,
          }}
          min={1}
        />
      </Form.Item>
    );
  };

  const RenderItem = ({ label, name }) => (
    <Form.Item
      label={label}
      name={name}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '15px 10px',
        width: '100%',
      }}
      requiredMark='optional'
      rules={[
        {
          required: true,
          message: 'Campo obrigatório!',
        },
      ]}
    >
      <Input style={{ width: '250px' }} />
    </Form.Item>
  );

  return (
    <Form
      onFinish={onFinish}
      layout='vertical'
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <div
        style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
      >
        <RenderItem label='Código' name='code' />
        <RenderItem label='Cliente' name='costumer' />
        <RenderDateItem label='Data do primeiro vencimento' name='date' />
        <RenderValueInput label='Valor' name='value' />
        <RenderInputNumber
          label='Quantidade de parcelas:'
          name='installments'
        />
        <RenderValueInput label='Total' name='total' />
        <RenderRadioGroupItem name='store' items={['Loja 1', 'Loja 2']} />
      </div>

      <Button htmlType='submit' type='primary'>
        Gerar Parcelas
      </Button>
    </Form>
  );
}
