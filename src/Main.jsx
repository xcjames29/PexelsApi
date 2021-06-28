import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import styled from "styled-components"
import { createClient } from "pexels";
const MainContainer = styled.div`
    min-height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    background-color: #03045E;
`;


const SearchContainer = styled.div`
    min-height: 200px;
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Input = styled.input`
    font-size: 24px;
    padding: 5px 10px;
`;

const Button = styled.button`
    font-size: 24px;
    padding: 5px 10px;
    &:hover{
        opacity: 0.7;
    }
`;

const PictureContainer = styled.div`
    width: calc(100% - 420px);
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    padding: 50px 200px;
    overflow: hidden;
`;

const Image = styled.img`
    width: 30%;
    object-fit: cover;
    border: 3px solid white;
    padding: 3px;
    border-radius: 20px;
`;

const API_KEY = "563492ad6f91700001000001ffaeab244b8043b982eabe857fdc0303";

export default function Main(){

    let searchRef = useRef();
    let [pictures,setPictures] = useState([]);
    let search = async()=>{
        if(searchRef.current.value !==""){
            const client = createClient(API_KEY);
           let data= await client.photos.search({query:searchRef.current.value,per_page:15})
           console.log(data);
           setPictures(data.photos);
        }
    }

    let getData = async()=>{
        const client = createClient(API_KEY);
       let data= await client.photos.curated({ per_page: 15 });
       console.log(data);
        setPictures(data.photos);
    }

    useEffect(()=>{
        getData();
    },[])
    return(
        <MainContainer>
            <SearchContainer>
                <Input type="text" ref={searchRef} />
                <Button onClick={search}>Search</Button>
            </SearchContainer>
            <PictureContainer>
                {
                    pictures.map(e=> {
                    console.log("asdasdasd?",e)
                    return <Image key={e.id} src={e.src.portrait} />} )

                }
            </PictureContainer>
        </MainContainer>
    )
}