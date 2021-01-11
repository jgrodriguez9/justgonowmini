import React, { useState } from 'react';
import { Col, Image, Row } from 'react-bootstrap';
import ItemsCarousel from 'react-items-carousel';

function CarouselTopDetail({photos,numberCards, imgHeight}){
    const [activeItemIndex, setActiveItemIndex] = useState(0);
    const chevronWidth = 40;
    return(
        <Row>
            <Col>
            <ItemsCarousel
                requestToChangeActive={setActiveItemIndex}
                activeItemIndex={activeItemIndex}
                numberOfCards={numberCards}
                gutter={10}
                leftChevron={<button>{'<'}</button>}
                rightChevron={<button>{'>'}</button>}
                outsideChevron={false}
                chevronWidth={chevronWidth}
                infiniteLoop
            >
                {
                    photos.map((item,i)=>(
                    <div style={{ height: imgHeight, background: '#EEE', overflow: 'hidden' }} key={i}>
                        <Image src={item.url} fluid className="h-100p object-cover"/>
                    </div>
                    ))
                }                
            </ItemsCarousel>
            </Col>
        </Row>
    )
}

export default CarouselTopDetail