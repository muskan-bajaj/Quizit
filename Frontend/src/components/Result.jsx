import { useEffect, useState } from "react";

import SideBar from "./SideBar";
import arrow from "../assets/arrow.svg";
import arrowUp from "../assets/arrowUp.svg";
import ResultCard from "./cards/ResultCard";

import css from "../css/Result.module.css";
import axios from "axios";
import Loading from "../Loading";

export default function Result() {
  const [declaredView, setDeclaredView] = useState(true);
  const [pendingView, setPendingView] = useState(true);
  const [declaredData, setDeclaredData] = useState([]);
  const [undeclaredData, setUndeclaredData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getTestHandler = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/test/report/list"
      );
      console.log(response.data);
      setDeclaredData(response.data.published);
      setUndeclaredData(response.data.pending);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  useEffect(() => {
    getTestHandler();
  }, []);

  return (
    <div className="flexpage">
      <SideBar />
      <>
        {loading ? (
          <Loading />
        ) : (
          <div className={css.resultScreen}>
            <div className={css.heading}>Report Analysis</div>
            <div className={css.upcoming}>
              <div className={css.sectionHeading}>
                <div className={css.text}>Declared Results</div>
                <div className={css.line}>
                  <hr />
                </div>
                <div className={css.dropdownArrow}>
                  <img
                    src={declaredView ? arrow : arrowUp}
                    onClick={() => {
                      setDeclaredView(!declaredView);
                    }}
                  />
                </div>
              </div>
              {declaredView ? (
                declaredData.length > 0 ? (
                  <div className={css.sectionDetails}>
                    {declaredData.map((data, key) => {
                      return (
                        <ResultCard key={key} data={data} declared={true} />
                      );
                    })}
                  </div>
                ) : (
                  <>No results found!</>
                )
              ) : (
                <></>
              )}
            </div>
            <div className={css.pending}>
              <div className={css.sectionHeading}>
                <div className={css.text}>Undeclared Result</div>
                <div className={css.line}>
                  <hr />
                </div>
                <div className={css.dropdownArrow}>
                  <img
                    src={pendingView ? arrow : arrowUp}
                    onClick={() => {
                      setPendingView(!pendingView);
                    }}
                  />
                </div>
              </div>
              {pendingView ? (
                undeclaredData.length > 0 ? (
                  <div className={css.sectionDetails}>
                    {undeclaredData.map((data, key) => {
                      return (
                        <ResultCard key={key} data={data} declared={false} />
                      );
                    })}
                  </div>
                ) : (
                  <>No results found!</>
                )
              ) : (
                <></>
              )}
            </div>
          </div>
        )}
      </>
    </div>
  );
}
