import { Helmet } from "react-helmet";


export default function HelmetComponent({ title }) {
    return (
        <Helmet>
            <title>{title} | Центче</title>
            <meta name="description" content="Това е описанието на моя сайт, което ще се появи в резултатите на Google." />
            <link rel="canonical" href="https://centche.online/cart" />
        </Helmet>
    );
}