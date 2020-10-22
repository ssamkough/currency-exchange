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

      var selectors = document.getElementsByClassName("exchangeSelect");
      for (var key in json.rates) {
        var nativeOption = document.createElement("option");
        nativeOption.text = key;
        nativeOption.value = key;
        selectors[0].appendChild(nativeOption);

        var foreignOption = document.createElement("option");
        foreignOption.text = key;
        foreignOption.value = key;
        selectors[1].appendChild(foreignOption);
      }
    };

    fetchData();
  });

  const convertRate = async () => {
    const res = await fetch(`https://api.exchangeratesapi.io/latest?symbols=${nativeRate},${foreignRate}`);
    const json = await res.json();

    const foreignRateNum: number = json.rates[foreignRate];
    setForeignNumber(nativeNumber / foreignRateNum);
  };

  return (
    <Container id="app">
      <Row>
        <Col>
          <Form.Control as="select" id="nativeSelect" className="exchangeSelect"></Form.Control>
        </Col>
        <Col>
          <Form.Control as="select" id="foreignSelect" className="exchangeSelect"></Form.Control>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Control id="nativeInput" value={nativeNumber}></Form.Control>
        </Col>
        <Col>
          <Form.Control id="foreignInput" value={foreignNumber} disabled></Form.Control>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button onClick={() => convertRate()}>Convert</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default App;
