import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const Home = () => {
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

      var selectors = document.getElementsByClassName("exchange-select");
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

      setNativeRate(arr[0]);
      setForeignRate(arr[0]);
    };

    fetchData();
  }, []);

  const convertRate = async () => {
    const res = await fetch(
      `https://api.exchangeratesapi.io/latest?symbols=${nativeRate},${foreignRate}`
    );
    const json = await res.json();

    const foreignRateNum: number = json.rates[foreignRate];
    setForeignNumber(nativeNumber / foreignRateNum);
  };

  const handleChange = (e: any, func: (param: any) => any) => {
    func(e.target.value);
  };

  return (
    <Container id="home-container">
      <Row id="header-row" className="app-row">
        <Col>
          <h2>Currency Exchange</h2>
        </Col>
      </Row>
      <Row id="selector-row" className="app-row">
        <Col>
          <Form.Control
            as="select"
            id="native-select"
            className="exchange-select"
            onChange={(e) => handleChange(e, setNativeRate)}
            data-testid="nativeSelect"
            custom
          ></Form.Control>
        </Col>
        <Col>
          <Form.Control
            as="select"
            id="foreign-select"
            className="exchange-select"
            onChange={(e: any) => handleChange(e, setForeignRate)}
            data-testid="foreignSelect"
            custom
          ></Form.Control>
        </Col>
      </Row>
      <Row id="input-row" className="app-row">
        <Col>
          <Form.Control
            id="native-input"
            value={nativeNumber}
            data-testid="nativeInput"
            onChange={(e: any) => handleChange(e, setNativeNumber)}
          ></Form.Control>
        </Col>
        <Col>
          <Form.Control
            id="foreign-input"
            value={foreignNumber}
            data-testid="foreignInput"
            disabled
          ></Form.Control>
        </Col>
      </Row>
      <Row id="btn-row" className="app-row">
        <Col>
          <Button onClick={() => convertRate()}>Convert</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
