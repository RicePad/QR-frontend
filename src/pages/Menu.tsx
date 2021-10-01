import { Container, Row, Col, Button } from 'react-bootstrap';
import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router';
import { fetchPlace } from '../apis';

interface MenuProps {
    id: number
}

const OrderButton = styled(Button)`
    position: fixed;
    bottom: 20px;
    right: 20px;
    border-radius: 50%;
    box-shadow: 1px 1px 8px rgba(0,0,0,0.2);
    width: 60px;
    height: 60px;
    `;

const Menu: React.FC<MenuProps> = () => {
    const [place, setPlace] = useState({}) 
   
    interface ParamTypes {
        id: string
    }
    
    const params = useParams<ParamTypes>()
    
    const onFetchPlace = async () => {
        const json = await fetchPlace(params.id)
        console.log('jsonMenu: ', json)
        if(json){
            setPlace(json)
        }

    useEffect(() => {
        onFetchPlace
    }, [])

    }    
        return(
       <Container>
           <Row>
               <Col>
                {/* Add MenuList Component */}
               </Col>
           </Row>
       </Container>
    )
}

export default Menu