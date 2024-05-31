import { useEffect, useState } from "react"
import { GET_ALL_ARTICLES } from "../Api/article-api"
import ArticleCard from "../components/Card"

const AllArticle = () => {
    const [allArticle, setAllArticle] = useState([])

    const fetchAllArticle = async () => {
        const result = await GET_ALL_ARTICLES()
        console.log(result)
        return result?.status === 200 ? (setAllArticle(result?.data?.article)) : alert("Some thing wend wrong")
    }
    useEffect(() => {
        fetchAllArticle()
    }, [])
    return <div>
        <h2>ALL ARTICLE</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", width: '80%', margin: 'auto' }}>
            {allArticle?.length > 0 ? <>

                {allArticle?.map((elem) => {

                    return <ArticleCard key={elem._id} elem={elem} fetchAllArticle={fetchAllArticle} />
                })}
            </> : <h2>No Article Found</h2>}
        </div>

    </div>
}
export default AllArticle