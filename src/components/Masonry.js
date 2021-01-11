import React from 'react'
import img1 from '../img/masonry/gallery1.png'
import img2 from '../img/masonry/gallery2.png'
import img3 from '../img/masonry/gallery3.png'
import img4 from '../img/masonry/gallery4.png'
import img5 from '../img/masonry/gallery5.png'
import img6 from '../img/masonry/gallery6.png'
import img7 from '../img/masonry/gallery7.png'
import img8 from '../img/masonry/gallery8.png'
import img9 from '../img/masonry/gallery9.png'
import img10 from '../img/masonry/gallery10.png'
import imgText from '../img/masonry/gallery-info.svg'
import { Col, Container, Image, Row } from 'react-bootstrap'

import '../css/MasonryImage.css'

function MasonryImage(){
    
    return(
        <section>
            <Container>
                <Row className="">
                    <Col>
                    <div className="d-flex justify-content-center mtest">
                        <div className="w-20">
                            <Image src={img1} fluid className="h-12rem masonry-p"/>
                            <Image src={img6} fluid className="h-23rem masonry-p"/>
                        </div>
                        <div className="w-40">
                            <Image src={img2} fluid className="h-24rem masonry-p"/>
                            <div>
                                <Image src={img8} fluid className="h-12rem masonry-p"/>
                            </div>
                        </div>
                        <div className="w-20">
                            <Image src={img3} fluid className="h-12rem masonry-p"/>
                            <div className="w-200">
                                <Image src={imgText} fluid className="h-12rem masonry-p"/>
                            </div>
                            <div>
                                <Image src={img7} fluid className="h-12rem masonry-p"/>
                            </div>
                        </div>
                        <div className="w-20">
                            <Image src={img4} fluid className="h-12rem masonry-p"/>
                            <Image src={img9} fluid className="h-12rem masonry-p mt-12rem"/>
                        </div>
                        <div className="w-20">
                            <Image src={img5} fluid className="h-12rem masonry-p"/>
                            <Image src={img10} fluid className="h-23rem masonry-p"/>
                        </div>
                        
                        
                    </div>
                    </Col>
                </Row>
            </Container>            
        </section>
    )
}

export default MasonryImage