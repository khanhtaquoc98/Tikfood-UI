import React from "react";

export default class Restaurant extends React.Component{
    
    render(){
        return(
          <section className="parallax-section " style={{padding: "90px 0"}} data-scrollax-parent="true" >
          <div className="bg par-elem " style={{backgroundImage: "url(/images/25161502-fbb7de.jpg)"}}  data-scrollax="properties: { translateY: '30%' }" />
          <div className="overlay  op7" />
          <div className="container">
              <div className=" single-facts single-facts_2 fl-wrap">
              {/* inline-facts */}
              <div className="inline-facts-wrap">
                  <div className="inline-facts">
                  <div className="milestone-counter">
                      <div className="stats animaper">
                      <div className="num" data-content={0} data-num={1254}>1254</div>
                      </div>
                  </div>
                  <h6>Lượt truy cập mỗi tuần</h6>
                  </div>
              </div>
              {/* inline-facts end */}
              {/* inline-facts  */}
              <div className="inline-facts-wrap">
                  <div className="inline-facts">
                  <div className="milestone-counter">
                      <div className="stats animaper">
                      <div className="num" data-content={0} data-num={12168}>12168</div>
                      </div>
                  </div>
                  <h6>Số khách hàng mỗi năm</h6>
                  </div>
              </div>
              {/* inline-facts end */}
              {/* inline-facts  */}
              <div className="inline-facts-wrap">
                  <div className="inline-facts">
                  <div className="milestone-counter">
                      <div className="stats animaper">
                      <div className="num" data-content={0} data-num={2172}>2172</div>
                      </div>
                  </div>
                  <h6>Nhà hàng có mặt trên TikFood</h6>
                  </div>
              </div>
              {/* inline-facts end */}
              {/* inline-facts  */}
              <div className="inline-facts-wrap">
                  <div className="inline-facts">
                  <div className="milestone-counter">
                      <div className="stats animaper">
                      <div className="num" data-content={0} data-num={732}>732</div>
                      </div>
                  </div>
                  <h6>Người tương tác mỗi tuần</h6>
                  </div>
              </div>
              {/* inline-facts end */}
              </div>
          </div>
          </section>
        )
    }
}