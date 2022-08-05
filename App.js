import { GlobalContextProvider } from './globalContext';
import { MainApp } from './MainApp';

export const getParsedDocsFromQuerySnapShot = (querySnapShot) => {
    const collection = [];
    querySnapShot.forEach(doc => {
        collection.push({ id: doc.id, ...doc.data() });
    });
    return collection;
};

export default function App() {
    return (
        <GlobalContextProvider>
            <MainApp/>
        </GlobalContextProvider>
    );
}
