import "./../styles/MySkills.css"
import htmlLogo from '/assets/HTML.png'
import cssLogo from '/assets/CSS.png'
import jsLogo from '/assets/Javascript.png'
import reactLogo from '/assets/React.png'
import nodeLogo from '/assets/Node.png'
import mongoLogo from '/assets/Mongodb.png'
import nextLogo from '/assets/Next.webp'

const MySkills = () => {
  return (
    <div>
    <section className="Myskills" id="myskills">
            <div className="up">
                <h1 className='skills'>My skills</h1>
            </div>
            <div className="middle">
                <span>As a Full Stack Web Developer. From crafting responsive front-end interfaces to building robust back-end systems, efficient code and best practices.</span>
            </div>
            <div className="down">
                <div className="box">
                    <div className="upper">
                        <img src={htmlLogo} alt="HTML" />
                    </div>
                    <div className="lower">HTML</div>
                </div>
                <div className="box">
                    <div className="upper">
                        <img src={cssLogo} alt="CSS" />
                    </div>
                    <div className="lower">CSS</div>
                </div>
                <div className="box">
                    <div className="upper">
                        <img src={jsLogo} alt="JavaScript" />
                    </div>
                    <div className="lower">JavaScript</div>
                </div>
                <div className="box">
                    <div className="upper">
                        <img src={reactLogo} alt="React" />
                    </div>
                    <div className="lower">React</div>
                </div>
                <div className="box">
                    <div className="upper">
                        <img src={nodeLogo} alt="Node.js" />
                    </div>
                    <div className="lower">Node.js</div>
                </div>
                <div className="box">
                    <div className="upper">
                        <img src={mongoLogo} alt="MongoDB" />
                    </div>
                    <div className="lower">MongoDB</div>
                </div>
                <div className="box">
                    <div className="upper">
                        <img src={nextLogo} alt="Next.js" />
                    </div>
                    <div className="lower">Next.js</div>
                </div>
            </div>
        </section>
    </div>
  )
}

export default MySkills