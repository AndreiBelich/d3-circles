import { useState, useEffect, useRef } from "react";
import Node from "../components/MyFirstComponent/d3file";

const useGraph = (url) => {
    const [data, setData] = useState(null);
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState(null);
    const node = useRef(new Node()).current

    useEffect(() => {
        fetch(url).then(response => {
                    if(response.ok){
                        return response.json();
                    }
                    throw response;
                   })
                  .then(({data: fetchData}) => {
                      node.drawCircles(fetchData);
                      setData(() => [...fetchData])
                  })
                  .catch((error) => {
                      setError(error)
                  })
                  .finally(() => {
                      setIsFetching(false)
                  })
    },[node, url]);

    const addCircle = () => {
        const newData = node.addCircle();
        setData([...data, newData]);
    }

    return {
        isFetching,
        error,
        data,
        node,
        addCircle
    };
}

export default useGraph;