import styles from "./NoPage.module.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";

export default function NoPage(): JSX.Element {
  return (
    <>
      <Header />
      <div className={styles.noPage}>
        <div
          className={
            styles.pageTop +
            " d-flex flex-column justify-content-center align-items-center"
          }
        >
          <h4>404</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
            tellus, luctus nec.
          </p>
          <Link to="/">to Home page</Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
