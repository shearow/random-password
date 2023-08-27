import { useState, useEffect } from "react"
import { MIN_CARACTERS_PASS, MAX_CARACTERS_PASS, initialOptionsGenerator, allCaracters } from "../helpers/randomPassword.js"
import "../styles/randomPassword.css"

export const RandomPassword = () => {
    const [optionsGenerator, setOptionsGenerator] = useState(initialOptionsGenerator)
    const [copiedState, setCopiedState] = useState(false);
    const [generatedPass, setGeneratedPass] = useState("");

    useEffect(() => {
        setCopiedState(false);
    }, [generatedPass]);
    
    const copyPass = async (e) => {
        e.preventDefault();

        try {
            await navigator.clipboard.writeText(e.target.generatePass.value);
            setCopiedState(true);
        } catch (err) {
            console.error('Failed to copy!', err);
        }
    }

    const changeOptions = ({option}) => {
        if(option === "digits") {
            let num = parseInt(event.target.value);

            if(typeof num === "number" && num !== ""){
                if(num < MIN_CARACTERS_PASS || num > MAX_CARACTERS_PASS){
                    num = MIN_CARACTERS_PASS;
                }
                setOptionsGenerator(prevState => (
                    {
                        ...prevState,
                        [option]: num
                    }
                ))
            }
            return;
        }

        setOptionsGenerator(prevState => (
            {
                ...prevState,
                [option]: !prevState[option]
            }
        ));
    }

    const generateRandomPass = () => {
        let pass = "";
        let selectedCaracters = "";

        if(optionsGenerator.numbers) selectedCaracters += allCaracters.numbers;
        if(optionsGenerator.upperCase) selectedCaracters += allCaracters.upperCase;
        if(optionsGenerator.lowerCase) selectedCaracters += allCaracters.lowerCase;
        if(optionsGenerator.symbols) selectedCaracters += allCaracters.symbols;

        while(optionsGenerator.digits > pass.length && selectedCaracters !== ""){
            const randomNum = Math.floor(Math.random() * selectedCaracters.length);
            pass += selectedCaracters[randomNum];
        }
        setGeneratedPass(pass);
    }

    return (
        <div className="generator-pass">
            <div className="generator-pass-container container">
                <h2>Generate a</h2>
                <h2><span>Random Password</span></h2>
                <form className="form-generator-pass" onSubmit={copyPass}>                    
                    <p>MIN <span>{MIN_CARACTERS_PASS}</span> - MAX <span>{MAX_CARACTERS_PASS}</span></p>
                    <input 
                        onChange={() => changeOptions({option: "digits"})}
                        type="number" 
                        name="selectNumber"
                        className="select-number"
                        min={1} 
                        max={30} 
                        placeholder={MIN_CARACTERS_PASS}
                    />

                    <div className="generator-pass-options">
                        <div className="box-options">
                            <label htmlFor="numbers-generator-pass">Numbers</label>
                            <input 
                                onChange={() => changeOptions({option: "numbers"})}
                                type="checkbox" 
                                name="numbers" 
                                id="numbers-generator-pass"
                                checked={optionsGenerator.numbers}
                            />
                        </div>
                        <div className="box-options">
                            <label htmlFor="upperCase-generator-pass">UpperCase</label>
                            <input 
                                onChange={() => changeOptions({option: "upperCase"})}
                                type="checkbox"
                                name="upperCase"
                                id="upperCase-generator-pass"
                                checked={optionsGenerator.upperCase} 
                            />
                        </div>
                        <div className="box-options">
                            <label htmlFor="lowerCase-generator-pass">LowerCase</label>
                            <input 
                                onChange={() => changeOptions({option: "lowerCase"})}
                                type="checkbox" 
                                name="lowerCase" 
                                id="lowerCase-generator-pass"
                                checked={optionsGenerator.lowerCase} 
                            />
                        </div>
                        <div className="box-options">
                            <label htmlFor="symbols-generator-pass">Symbols</label>
                            <input 
                                onChange={() => changeOptions({option: "symbols"})}
                                type="checkbox" 
                                name="symbols" 
                                id="symbols-generator-pass"
                                checked={optionsGenerator.symbols}
                            />
                        </div>
                    </div>

                    <div className="input-generator-pass">
                        <input
                            onChange={() => setCopiedState(false)} 
                            type="text" 
                            name="generatePass"
                            value={generatedPass}
                        /> 
                        <button className="copy">{copiedState ? "Copied ✅" : "Copy 🔥"}</button>
                    </div>    
                </form>
                <button onClick={generateRandomPass} className="btn-generate-pass">Generate Password</button>
            </div>
        </div>
    )
}