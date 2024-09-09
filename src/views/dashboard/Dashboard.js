import React, { useEffect, useState } from 'react';
import { CCard, CCardBody, CCol, CCardHeader, CRow } from '@coreui/react'
import {
  CChartBar,
} from '@coreui/react-chartjs'


const Charts = () => {
  const [username, setUsername] = useState([]);
  const [usernameCounter, setUsernameCounter] = useState([]);
  const [machine, setMachine] = useState([]);
  const [machineCounter, setMachineCounter] = useState([]);
  

  function agruparUsuarios(dados) {
    const contadores = {};

    dados.forEach(item => {
      const usuario = item.Usuario;
      const contador = item.Contador;

      if (!contadores[usuario]) {
        contadores[usuario] = 0;
      }

      contadores[usuario] += contador;
    });

    const resultado = Object.keys(contadores).map(usuario => ({
      Usuario: usuario,
      TotalContador: contadores[usuario]
    }));
    return resultado;
  }
  function agruparMaquina(dados) {
    const contadores = {};

    dados.forEach(item => {
      const maquina = item.Maquina;
      const contador = item.Contador;

      if (!contadores[maquina]) {
        contadores[maquina] = 0;
      }

      contadores[maquina] += contador;
    });

    const resultado = Object.keys(contadores).map(maquina => ({
      Maquina: maquina,
      TotalContador: contadores[maquina]
    }));

    return resultado;
  }

  const criarArrays = async (resultadoUsuario, resultadoMaquina) => {
    const usuario = resultadoUsuario.map(item => item.Usuario);
    const usuarioContador = resultadoUsuario.map(item => item.TotalContador);
    setUsername(usuario)
    setUsernameCounter(usuarioContador)
    const maquina = resultadoMaquina.map(item => item.Maquina);
    const maquinaContador = resultadoMaquina.map(item => item.TotalContador);
    setMachine(maquina)
    setMachineCounter(maquinaContador)
  }

  const formatResponse = async (response) => {
    const resultadoUsuario = agruparUsuarios(response.documents)
    const resultadoMaquina = agruparMaquina(response.documents)
    criarArrays(resultadoUsuario, resultadoMaquina)    
  }

  const fetchData = async () => {
      const myHeaders = new Headers();
      myHeaders.append("X-Appwrite-Project", "66cbb2520024ddcdfdba");
  
      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      };
  
      fetch("https://cloud.appwrite.io/v1/databases/66cbb288000b1e3b673f/collections/66cbb393002568ca85b0/documents", requestOptions)
        .then((response) => response.text())
        .then((result) => formatResponse(JSON.parse(result)))
        .catch((error) => console.error(error));
  
  }
  

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>Contagem Pessoa</CCardHeader>
          <CCardBody>
            <CChartBar
              data={{
                labels: username,
                datasets: [
                  {
                    label: 'Operações',
                    backgroundColor: '#f87979',
                    data: usernameCounter,
                  },
                ],
              }}
              labels="months"
            />
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>Contagem por Máquina</CCardHeader>
          <CCardBody>
            <CChartBar
              data={{
                labels: machine,
                datasets: [
                  {
                    label: 'Operações',
                    backgroundColor: '#f87979',
                    data: machineCounter,
                  },
                ],
              }}
              labels="months"
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Charts
