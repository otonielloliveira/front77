import React, { useEffect, useState } from 'react';

import InputMask from "react-input-mask";

import Geocode from "react-geocode";
import axios from 'axios';

Geocode.setApiKey("");

Geocode.setLanguage("pt-BR");


const Dashboard = () => {

    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState(false)
    const [postalCode, setPostaCode] = useState("pt-BR")
    const [lat, setLat] = useState("")
    const [lng, setLng] = useState("")
    const [money, setMoney] = useState("")
    const [type, setType] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")

    const [parcelamento, setParcelamento] = useState([])
    const [integradores, setIntegradores] = useState(0)
    const [economia, setEconomia] = useState("")
    const [potencial, setPotencial] = useState()



    useEffect(() => {

        if (postalCode.length === 9) {
            handlePostaCode(postalCode)
        }

    }, [postalCode])

    async function handlePostaCode(val) {

        Geocode.fromAddress(val).then(
            (response) => {
                const city = response.results[0].address_components[1].short_name
                const state = response.results[0].address_components[3].short_name
                const { lat, lng } = response.results[0].geometry.location;

                setLat(lat)
                setLng(lng)
                setCity(city)
                setState(state)
            },
            (error) => {
                console.error(error);
            }
        );

    }

    async function handleSubmit() {

        if (postalCode === null || money === null || type === null) {
            alert("Preencher todos os dados para pesquisa!")
            return
        } else if (lat === null || lng === null) {
            alert("Favor preenche um cep valido!!")
            return
        }

        const data = {
            estrutura: type,
            estado: state,
            cidade: city,
            valor_conta: money,
            cep: postalCode,
            latitude: lat,
            longitude: lng
        }

        try {
            setLoading(true)
            setResult(false)



            const { data: { economia, integradores_regiao, parcelamento, potencial } } = await axios.get("https://api2.77sol.com.br/busca-cep", { params: data })

            setEconomia(economia)
            setIntegradores(integradores_regiao)
            setParcelamento(parcelamento)
            setPotencial(potencial)

            setResult(true)

        } catch (error) {

            console.log("response::::", error)

        } finally {
            setLoading(false)
        }




    }


    return (
        <div className="container d-flex justify-content-center">




            {result && (
                <div className="card mt-10 w-100">
                    <div className="card-header">
                        Resultado
                    </div>
                    <div className="card-body">

                        <div className=" mt-5 w-100">
                            <table className="table ">
                                <thead>
                                    <tr>
                                        <th scope="col">Economia</th>
                                        <th scope="col">Empresas Parceiras</th>
                                        <th scope="col">Potencial</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{economia}</td>
                                        <td>{integradores}</td>
                                        <td>{potencial}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className=" mt-5 w-100">
                            <table className="table ">
                                <thead>
                                    <tr>
                                        <th scope="col">Parcelas</th>
                                        <th scope="col">Taxa Maxima</th>
                                        <th scope="col">Taxa Minina</th>
                                        <th scope="col">Valor Maximo</th>
                                        <th scope="col">Valor Minimo</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {parcelamento && parcelamento.length > 0 && parcelamento.map(item => (
                                        <tr>
                                            <td>{item.parcelas}</td>
                                            <td>{item.taxa_maxima}</td>
                                            <td>{item.taxa_minina}</td>
                                            <td>{item.valor_maximo.toFixed(2)}</td>
                                            <td>{item.valor_minimo.toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            )}

            <div className="card mt-5 w-50">
                {loading && (
                    <div className="alert alert-warning alert-dismissible fade show" role="alert">
                        <strong>Aguarde...</strong> Estamos processando sua solicitação...
                    </div>
                )}

                <div className="card-header">
                    <div className=" d-flex justify-content-center">
                        <strong>Simulador</strong>
                    </div>
                </div>
                <div className="card-body">
                    <form>
                        <div className="form-group">
                            <InputMask mask="99999-999"
                                maskPlaceholder=""
                                className="form-control"
                                value={postalCode}
                                onChange={(e) => setPostaCode(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                id="amountConta"
                                placeholder="Valor da conta"
                                value={money}
                                onChange={((e) => setMoney(e.target.value))}
                            />

                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                id="password"
                                placeholder="Tipo de telhado"
                                value={type}
                                onChange={((e) => setType(e.target.value))}
                            />
                        </div>

                    </form>
                </div>
                <div className="card-footer w-100" >
                    <div className="d-flex justify-content-center w-100 ">
                        <button type="button"
                            onClick={() => handleSubmit()}
                            className="btn btn-primary w-100">Simular</button>
                    </div>
                </div>
            </div>




        </div>
    );
};

export default Dashboard;
