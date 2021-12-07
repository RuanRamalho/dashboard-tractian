import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Table, Space, Modal, Button, Input } from 'antd';
import Item from 'antd/lib/list/Item';
import Api from '../../services/api';

interface ICompanies {
  id: number;
  name: string;
}

interface IUnits {
  id: number;
  name: string;
}

interface IUsers {
  id: number;
  name: string;
  email: string;
  unitId: number;
  companyId: number;
}

interface IColumns {
  title: string;
  dataIndex: string;
  key: string;
  render?: any;
}

function Companies() {
  const [companies, setCompanies] = useState<ICompanies[]>([]);
  const [units, setUnits] = useState<IUnits[]>([]);
  const [users, setUsers] = useState<IUsers[]>([]);
  const [tableInfo, setTableInfo] = useState<any>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    Api.get('/units')
      .then(({ data }) => setUnits(data))
      .catch(error => {
        console.log(`Ops! Algo deu errado ${error}`);
      });
  }, []);

  useEffect(() => {
    Api.get('/companies')
      .then(({ data }) => setCompanies(data))
      .catch(error => {
        console.log(`Ops! Algo deu errado ${error}`);
      });
  }, []);

  useEffect(() => {
    Api.get('/users')
      .then(({ data }) => setUsers(data))
      .catch(error => {
        console.log(`Ops! Algo deu errado ${error}`);
      });
  }, []);

  useEffect(() => {
    setTableInfo([
      ...users.map(item => {
        return {
          ...item,
          company:
            companies?.find(value => value.id === item.companyId)?.name ?? '',
          unity: units?.find(value => value.id === item.unitId)?.name,
        };
      }),
    ]);
  }, [users, companies, units]);

  const columns: IColumns[] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Unidade',
      dataIndex: 'unity',
      key: 'unitId',
    },
    {
      title: 'Empresa',
      dataIndex: 'company',
      key: 'companyId',
    },
    {
      title: 'Action',
      key: 'action',
      dataIndex: 'action',
      render: (text: string, record: string) => (
        <>
          <Space size="middle">
            <Button type="primary" onClick={() => setIsModalVisible(true)}>
              Atualizar
            </Button>
          </Space>
        </>
      ),
    },
  ];

  return (
    <>
      {console.log(tableInfo)}
      <Container>
        <Table columns={columns} dataSource={tableInfo} />
        <Modal
          title="Basic Modal"
          visible={isModalVisible}
          onOk={() => setIsModalVisible(false)}
          onCancel={() => setIsModalVisible(false)}
        >
          <Input name="name" placeholder="Nome" />
          <Input name="email" placeholder="Email" />
          <Input name="unitId" placeholder="Unidade" />
          <Input name="companyId" placeholder="Empresa" />
        </Modal>
      </Container>
    </>
  );
}

export default Companies;
