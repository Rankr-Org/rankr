import {useEffect, useState} from 'react'
import './App.css'
import {ReactSortable} from "react-sortablejs";
import {Button, Input} from "@mui/joy";
import {useSearchParams} from "react-router-dom";


type ItemType = {
    id: number;
    name: string;
}

const App = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [state, setState] = useState<ItemType[]>(JSON.parse(atob(searchParams.get("state") || btoa("[]"))));
    const [url, setUrl] = useState("")

    useEffect(() => {
        setSearchParams({state: btoa(JSON.stringify(state))})
    }, [setSearchParams, state])

    return (
        <>
            <ReactSortable list={state} setList={setState}>
                {state.map((item, index) => (
                    <div style={{position: "relative", textAlign: "center"}}>
                        <img style={{width: "250px"}} key={item.id} src={item.name} alt={""}/>
                        {index === 0 && state.length > 1 ? <div style={{
                            position: "absolute",
                            bottom: "8px",
                            left: "8px",
                            color: "red"
                        }}>Worst</div> : index === state.length - 1 && state.length > 1 ? <div style={{
                            position: "absolute",
                            bottom: "8px",
                            left: "8px",
                            color: "green"
                        }}>Best</div> : null}
                        <Button
                            color={"danger"}
                            style={{position: "absolute", top: "8px", right: "8px"}}
                            size="sm"
                            variant="outlined"
                            onClick={() => setState(prevState => [...prevState.slice(0, index), ...prevState.slice(index + 1)])}
                        >X</Button>
                    </div>
                ))}
            </ReactSortable>
            <Input
                placeholder={"Image URL"}
                value={url}
                onChange={event => setUrl(event.target.value)}
            />
            <Button
                onClick={() => {
                    setState(prevState => [...prevState, {id: prevState.length, name: url}])
                    setUrl("")
                }}
            >Add Image</Button>
        </>
    );
};

export default App
