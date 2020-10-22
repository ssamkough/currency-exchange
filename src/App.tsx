import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const App = () => {
  const [nativeRate, setNativeRate] = useState("");
  const [foreignRate, setForeignRate] = useState("");
  const [nativeNumber, setNativeNumber] = useState(0);
  const [foreignNumber, setForeignNumber] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("https://api.exchangeratesapi.io/latest");
      const json = await res.json();

      let arr: string[] = [];
      for (var key in json.rates) {
        arr.push(key);
      }
      arr.sort();

      var selectors = document.getElementsByClassName("exchangeSelect");
      for (var i in arr) {
        var nativeOption = document.createElement("option");
        nativeOption.text = arr[i];
        nativeOption.value = arr[i];
        selectors[0].appendChild(nativeOption);

        var foreignOption = document.createElement("option");
        foreignOption.text = arr[i];
        foreignOption.value = arr[i];
        selectors[1].appendChild(foreignOption);
      }
    };

    fetchData();
  }, []);

  const convertRate = async () => {
    const res = await fetch(`https://api.exchangeratesapi.io/latest?symbols=${nativeRate},${foreignRate}`);
    const json = await res.json();

    const foreignRateNum: number = json.rates[foreignRate];
    setForeignNumber(nativeNumber / foreignRateNum);
  };

  const handleChange = (e: any, func: (param: any) => any) => {
    func(e.target.value);
  }

  return (
    <Container id="app">
      <Row id="headerRow" className="appRow">
        <Col>
          <h2>Currency Exchange <span role="img" aria-label="currency exchange emoji">💱</span></h2>
        </Col>
      </Row>
      <Row id="selectorRow" className="appRow">
        <Col>
          <Form.Control as="select" id="nativeSelect" className="exchangeSelect" onChange={(e) => handleChange(e, setNativeRate)} custom></Form.Control>
        </Col>
        <Col>
          <Form.Control as="select" id="foreignSelect" className="exchangeSelect" onChange={(e) => handleChange(e, setForeignRate)}custom></Form.Control>
        </Col>
      </Row>
      <Row id="inputRow" className="appRow">
        <Col>
          <Form.Control id="nativeInput" value={nativeNumber} onChange={(e) => handleChange(e, setNativeNumber)}></Form.Control>
        </Col>
        <Col>
          <Form.Control id="foreignInput" value={foreignNumber} disabled></Form.Control>
        </Col>
      </Row>
      <Row id="btnRow" className="appRow">
        <Col>
          <Button onClick={() => convertRate()}>Convert</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default App;