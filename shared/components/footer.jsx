import React from 'react';
import {Navbar} from 'react-bootstrap';

export default React.createClass({
    render() {
        return (
            <Navbar inverse fixedBottom>
                <Navbar.Collapse>
                    <Navbar.Text>PandaRUN v.0.0.1 &copy; 2015-2016 by Zoreslav Goral</Navbar.Text>
                    <Navbar.Text className="secondary-text">
                        <Navbar.Link href="http://pandaruncomua.s37.yourdomain.com.ua" target="_blank">
                            Попередня версія сайту
                        </Navbar.Link>
                        <Navbar.Link href="https://github.com/gzoreslav/panda-iso/issues" target="_blank">
                            Issues
                        </Navbar.Link>
                        <Navbar.Link href="https://github.com/gzoreslav/panda-iso/wiki" target="_blank">
                            Wiki
                        </Navbar.Link>
                        <Navbar.Link href="https://github.com/gzoreslav/panda-iso" target="_blank">
                            GitHub
                        </Navbar.Link>
                    </Navbar.Text>
                    <Navbar.Text pullRight className="counter">
                        <img
                            src="https://get.mycounter.ua/counter.php?id=148484"
                            title="MyCounter - лічильник і статистика"
                            alt="MyCounter - лічильник і статистика"
                            width="88" height="31" border="0" />
                    </Navbar.Text>
                    <Navbar.Text pullRight>
                        <Navbar.Link
                            style={{marginRight: '50px'}}
                            itemProp="sameAs"
                            href="https://www.facebook.com/pandaruncomua"
                            target="_blank">
                            Ми у Facebook
                        </Navbar.Link>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Navbar>
        );
    }
});
