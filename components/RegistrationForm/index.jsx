import { Button, DatePicker, Form, Input, Radio } from 'antd';
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

  const RenderDateItem = ({label, name}) => (
    <Form.Item
      label={label}
      name={name}
      requiredMark='optional'
      rules={[
        {
          required: false, //change
          message: 'Campo obrigatório!',
        },
      ]}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '40px',
        width: '80%',
      }}
    >
      <DatePicker style={{ width: '300px' }} placeholder='Selecione uma data' />
    </Form.Item>
  )

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
          required: false, //change
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
            value={index}
          />
        ))}
      </Radio.Group>
    </Form.Item>
  );

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
      }}
      requiredMark='optional'
      rules={[
        {
          required: false, //change,
          message: 'Campo obrigatório!',
        },
      ]}
    >
      <Input style={{ width: '300px' }} />
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
      <div>INFORMAÇÕES GERAIS</div>
      <RenderItem label='Código' name='code' />
      <RenderItem label='Vendedora' name='seller' />
      <RenderDateItem label='Data da compra' name='date' />
      <RenderRadioGroupItem
        name='store'
        items={['Loja 1', 'Loja 2']}
      />
      <div>DADOS DO CLIENTE</div>
      <RenderItem label='Cliente' name='costumer' />
      <RenderItem label='Endereço' name='address' />
      <RenderItem label='Bairro' name='neighborhood' />
      <RenderItem label='CEP' name='adress_code' />
      <RenderItem label='Cidade' name='city' />
      <RenderItem label='Estado' name='state' />
      <RenderItem label='Ponto de referência' name='ref_site' />
      {/* <RenderItem label='Contato Fixo' name='telephone' />
      <RenderItem label='Contato Móvel' name='cellphone' />
      <RenderItem label='CPF' name='cpf' />
      <RenderItem label='RG' name='rg' />
      <RenderItem label='Orgão Expedidor' name='rg_deliver' />
      <RenderDateItem label='Data de Expedição' name='rg_deliver_date' />
      <RenderDateItem label='Data de Nascimento' name='birthday' />
      <RenderItem label='Filiação' name='parents' />
      <RenderItem label='Email' name='email' />
      <RenderItem label='Instagram' name='instagram' />
      <RenderItem label='Facebook' name='facebook' /> */}
      {/* <div>DADOS DA VENDA</div>
      <RenderItem label='Valor' name='value' />
      <RenderRadioGroupItem
        label='Forma de pagamento'
        name='payment'
        items={['À vista', 'Cartão', 'Crediário']}
      />
      <RenderRadioGroupItem
        label='INFORMAÇÕES ADICIONAIS'
        name='more_information'
        items={['Primeiro cliente', 'Indicação']}
      /> */}

      <Button htmlType='submit' type='primary'>
        Gerar Ficha
      </Button>
    </Form>
  );
}
