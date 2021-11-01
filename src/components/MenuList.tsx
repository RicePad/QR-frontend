import React from 'react';
import styled from 'styled-components';
import MenuItem from './MenuItem';

interface MenuListProps {
    place: any
    shoppingCart: any
    onOrder: any
    color: any
    font: any
}

interface StyleProps {
  font?: any;
}

const Place = styled.div`
  text-align: center;
  img {
    border-radius: 5px;
    margin-bottom: 20px;
  }
`;
const Container = styled.div<StyleProps>`
  b, p {
    ${({ font }): any => font && `font-family: ${font};`}
  }
`;

const MenuList: React.FC<MenuListProps> = ({
  place, shoppingCart, onOrder, color = '', font = '',
}) => (
  <Container font={font}>
    <Place>
      <img src={place.image} width={100} height={100} alt="place" />
      <h3><b>{place.name}</b></h3>
    </Place>
    {place?.categories
      ?.filter(
        (category: any) => category.menu_items.filter((i: any) => i.is_available).length,
      )
      .map((category: any) => (
        <div key={category.id} className="mt-5">
          <h4 className="mb-4">
            <b>{category.name}</b>
          </h4>
          {category.menu_items
            .filter((item: any) => item.is_available)
            .map((item: any) => (
              <MenuItem
                key={item.id}
                onEdit=""
                item={{
                  ...item,
                  quantity: shoppingCart[item.id]?.quantity,
                }}
                onOrder={onOrder}
                color={color}
              />
            ))}
        </div>
      ))}
  </Container>

);

export default MenuList;
