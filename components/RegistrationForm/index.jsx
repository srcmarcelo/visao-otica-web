import { Button, DatePicker, Form, Input, InputNumber, Radio } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React, { useState } from 'react';
import CreatePDF from './generatePDF';

export default function RegistrationForm() {
  const onFinish = async (values) => {
    const pdf = await CreatePDF(values);

    const names = values.costumer.split(' ');

    const blob = new Blob([pdf, { type: 'application/octet-stream' }]);
    const urlDownload = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = urlDownload;
    a.download = `${names[0]}_${values.cpf}.pdf`;
    a.click();

    setTimeout(function () {
      window.URL.revokeObjectURL(urlDownload);
    }, 200);
  };

  const [recommendation, setRecommendation] = useState(false);
  const [add, setAdd] = useState(false);

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

  const RenderDecimalItem = ({ label, name }) => {
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
        rules={[
          {
            required: false,
            message: 'Campo obrigatório!',
          },
        ]}
      >
        <Input style={{ width: '125px' }} />
      </Form.Item>
    );
  };

  const RenderTextAreaItem = ({ label, name }) => {
    return (
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
        rules={[
          {
            required: false,
            message: 'Campo obrigatório!',
          },
        ]}
      >
        <TextArea rows={4} maxLength={225} />
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

  const RenderRadioGroupItem = ({ label, name, items, optional }) => (
    <Form.Item
      label={label}
      name={name}
      requiredMark={optional ? '' : 'optional'}
      rules={[
        {
          required: !optional,
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
        onChange={(e) => {
          if (name === 'first_time') {
            setRecommendation(e.target.value === 1);
          } else if (name === 'add') {
            setAdd(e.target.value === 0);
          }
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

  const RenderItem = ({ label, name, optional }) => (
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
      requiredMark={optional ? '' : 'optional'}
      rules={[
        {
          required: !optional,
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
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div>INFORMAÇÕES GERAIS</div>
          <RenderItem label='Código' name='code' />
          <RenderItem label='Vendedora' name='seller' />
          <RenderDateItem label='Data da compra' name='date' />
          <RenderRadioGroupItem name='store' items={['Loja 1', 'Loja 2']} />
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div>DADOS DO CLIENTE</div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <RenderItem label='Cliente' name='costumer' />
              <RenderItem label='Endereço' name='address' />
              <RenderItem label='Bairro' name='neighborhood' />
              <RenderItem label='CEP' name='adress_code' />
              <RenderItem label='Cidade' name='city' />
              <RenderItem label='Estado' name='state' />
              <RenderItem label='Ponto de referência' name='ref_site' />
              <RenderItem label='Contato Fixo' name='telephone' />
              <RenderItem label='Contato Móvel' name='cellphone' />
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <RenderItem label='CPF' name='cpf' />
              <RenderItem label='RG' name='rg' />
              <RenderItem label='Orgão Expedidor' name='rg_deliver' />
              <RenderDateItem
                label='Data de Expedição'
                name='rg_deliver_date'
              />
              <RenderDateItem label='Data de Nascimento' name='birthday' />
              <RenderItem label='Filiação' name='parents' />
              <RenderItem label='Email' name='email' />
              <RenderItem label='Instagram' name='instagram' optional={true} />
              <RenderItem label='Facebook' name='facebook' optional={true} />
            </div>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div>GRAU DO CLIENTE</div>
          <div style={{ display: 'flex' }}>
            <div style={{ margin: '20px' }}>
              <div style={{ textAlign: 'center' }}>LONGE</div>
              <RenderDecimalItem label='OD ESF.' name='away_od_esf' />
              <RenderDecimalItem label='OD CIL.' name='away_od_cil' />
              <RenderDecimalItem label='OD EIXO' name='away_od_x' />
              <RenderDecimalItem label='OE ESF.' name='away_oe_esf' />
              <RenderDecimalItem label='OE CIL.' name='away_oe_cil' />
              <RenderDecimalItem label='OE EIXO' name='away_oe_x' />
            </div>
            <div style={{ margin: '20px' }}>
              <div style={{ textAlign: 'center' }}>PERTO</div>
              <RenderDecimalItem label='OD ESF.' name='close_od_esf' />
              <RenderDecimalItem label='OD CIL.' name='close_od_cil' />
              <RenderDecimalItem label='OD EIXO' name='close_od_x' />
              <RenderDecimalItem label='OE ESF.' name='close_oe_esf' />
              <RenderDecimalItem label='OE CIL.' name='close_oe_cil' />
              <RenderDecimalItem label='OE EIXO' name='close_oe_x' />
            </div>
          </div>
          <RenderRadioGroupItem
            label='Adição'
            name='add'
            items={['Sim', 'Não']}
          />
          {add && <RenderItem label='Valor da adição' name='add_value' />}
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div>DADOS DA VENDA</div>
          <RenderValueInput label='Valor' name='value' />
          <RenderRadioGroupItem
            label='Forma de pagamento'
            name='payment'
            items={['À vista', 'Cartão', 'Crediário']}
          />
          <RenderTextAreaItem
            label='Informaçõe Adicionais'
            name='more_information'
          />
          <RenderRadioGroupItem
            name='first_time'
            optional={true}
            items={['Primeiro cliente', 'Indicação']}
          />
          {recommendation && (
            <RenderItem label='Indicado por' name='recommended' />
          )}
        </div>
      </div>

      <Button htmlType='submit' type='primary'>
        Gerar Ficha
      </Button>
    </Form>
  );
}
