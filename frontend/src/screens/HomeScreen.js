import { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import logger from 'use-reducer-logger';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Product from '../components/Product';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import Nav from 'react-bootstrap/Nav';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Nplogo from "../images/Np-logo-dark.webp"
// import data from '../data';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
function HomeScreen() {
  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: '',
  });
  const [categories, setCategories] = useState(["Female","Male","Deceased","Department Of Justice"]);
  const [categoriesimages, setCategoriesimages] = useState(["Female.webp","Male.webp","Deceased.webp","Doj.webp"]);

  // const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/products');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }

      // setProducts(result.data);
    };
    fetchData();
  }, []);
  return (
    <div>
      <Helmet>
        <title>NoPixel</title>
      </Helmet>
      <div className='d-flex justify-content-between align-items-center'>
        <div>
         <h1 className='page-header-title'>Home</h1>

        </div>
        <div>
          <a className="wds-button wds-is-text page-header__action-button has-label" href="/wiki/NoPixel_Community?action=edit" id="ca-viewsource" data-tracking-label="ca-viewsource" accesskey="e">
					View source</a>
        </div>
      </div>
      <div className='server-description'>
        <div className='server-description-page'>
          <div className='server-description-page-text text-center'>
            <div className='mt-3'>
              <font size="7" color="#fff"><b>Welcome to the NoPixel 3.0 Wiki!</b></font>
            </div>
            <div className='mt-3'>
                <a accesskey="z" href="//nopixel.fandom.com">
                  <img src={Nplogo} width="250" height="78" alt="NoPixel community"/>
                </a>
            </div>
            <p><font size="3"><b>[ </b>We are currently editing • <b><a href="/wiki/Special:Statistics" title="Special:Statistics">7,725</a></b> • articles, and • <b><a href="/wiki/Special:Statistics" title="Special:Statistics">34,066</a></b> • files.<b> ]</b></font></p>
            <hr></hr>
            <div className='mt-3'>
                <font size="7" color="#FFFFF"><b>About NoPixel 3.0 Wiki!</b></font>
            </div>
            <div className='mt-3'>
                <font size="7" color="#00f8b9"><b>NoPixel Official Website</b></font>
            </div>
            <div className='mt-5 w-75 mx-auto'>
             <font size="4"><p>NoPixel is a Grand Theft Auto V role-play server, developed by Koil and many other developers and contributors. The server is run on the third-party multiplayer server system, FiveM. It contains custom scripts created by Koil, and community developers.</p></font>
            </div>
            <div className='mt-3 w-75 mx-auto'>
              <font size="4"><p>The idea of role-play is to talk, act, and proceed as the character you are playing. This means that any action taken while in-game is taken on behalf of your character. The intent is to create an immersive experience where players and viewers alike can experience stories and situations, in what is essentially another world.</p></font>
            </div>
            <div className='mt-3 w-75 mx-auto'>
              <font size="4"><p>The goal of this wiki is to allow every streamer a chance to have their character on here for everyone to see and read about. Whether a streamer with over 10,000 viewers or less than five viewers, each one has the opportunity to have their character in here.</p></font>
            </div>
            <div className='mt-5'>
              <font size="4"><p><b> Important Rules:</b> </p></font>
            </div>
            <div className='mt-5 w-75 mx-auto'>
              <font size="4"><p>- No OOC Drama/Toxicity in any comments or pages
                  - Do not discuss player bans or ban reasoning at any point
                  - Do not remove content from a page unless it is false
                  - Do not edit war with others, if you have in issue with someone join our Discord
                  - Do not add false/irrelevant OOC info to character pages</p></font>
            </div>
            <div className='mt-3 w-75 mx-auto'>
              <font size="4"><p>Depending on the severity of the rule break, you may be permanently blocked with no warning beyond this one. Rules are subject to change at any point without notice, it is your responsibility to keep updated on the rules. If you see any comments or edits that break these rules, please report them, or inform us via Discord if it goes unnoticed. We are not always watching, and with the heavy traffic recently it is possible for us to miss some vandalism to pages.</p></font>
            </div>
            <div className='mt-3 w-75 mx-auto'>
              <font size="4"><p>A complete list of rules can be found on the Rules page.
                Thank you for contributing!</p></font>
            </div>
            <div className='mt-3 w-75 mx-auto'>
              <font size="4"><p>-NP Wiki Admin Team</p></font>
            </div>
            <hr></hr>
            <div className='mt-3 mb-5'>
                <font size="5" color="#FFFFF"><b>Character Directory</b></font>
            </div>
            <div className="products">
              {loading ? (
                <LoadingBox />
              ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
              ) : (
                <Row className='justify-content-between'>
                  {/* {products.map((product) => (
                    <Col key={product.slug} sm={6} md={4} lg={4} className="mb-3">
                      <Product product={product}></Product>
                    </Col>
                  ))} */}
                   {categories.map((category,i) => (
                      <Col key={category} sm={6} md={3} lg={3} className="mb-3 box-column">
                        <LinkContainer
                          to={`/search?category=${category}`}
                        >
                        <Nav.Link><img src={"../images/"+categoriesimages[i]} className="card-img-top" /></Nav.Link>

                        </LinkContainer>

                        <LinkContainer
                          to={`/search?category=${category}`}
                        >
                          <Nav.Link>{category}</Nav.Link>
                        </LinkContainer>
                      </Col>
                    ))}
                </Row>
              )}
            </div>
          </div>
          
        </div>
      </div>
      
    </div>
  );
}
export default HomeScreen;
