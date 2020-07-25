import React, { useState , useEffect, useContext, useRef, useCallback } from 'react'
import TweetContainer from './tweetcontainer'
import { Context } from '../../Context'
import { getFeed } from '../../services/tweet'
import { borrarElementos } from '../../utils/general'
import useNearScrean from '../../hooks/useNearScreen'
import debounce from 'just-debounce-it'
import Loading from '../general/loading'


function TweetHandle(props){
    const [ tweetsInit, setTweetsInit ] = useState([])
    const [ tweets, setTweets ] = useState([])
    const { newTweets } = props
    const { getTweets } = props
    const { username } = props
    const [ page, setPage ] = useState(1)
    const [ isLastPage, setIsLastPage ] = useState(false)
    const [ loading, setLoading ] = useState(false)
    
    const { isAuth } = useContext(Context)
    const externalRef = useRef()
    const { isNearScreen } = useNearScrean({ 
        externalRef: externalRef,
        once: false
     })
 
    useEffect(() => {
        setLoading(true)
        if(username){
            getTweets(username, page)
            .then(response => {
                setLoading(false)
                const { data } = response
                setTweetsInit(data.results)
                setIsLastPage(data.next === null)
            })
        }else{
            if( isAuth ){
                getFeed( page )
                .then(response => {
                    setLoading(false)
                    const { data } = response
                    setTweetsInit(data.results)
                    setIsLastPage(data.next === null)
                })
                .catch(error=> {
                    setLoading(false)
                    console.log(error)
                })
            }else{
                getTweets( page )
                .then(response => {
                    setLoading(false)
                    const { data } = response
                    setTweetsInit(data.results)
                    setIsLastPage(data.next === null)
                })
            }
            
        }
    }, [getTweets, isAuth, username, page])

    // Use effect cuando se cambia el valor del tweetsINit
    useEffect(() => {
        // ELimina los tweets repetidos
        setTweets(tweets => {
            const nuevoArrayFiltrado = borrarElementos(tweets, tweetsInit)
            return [...nuevoArrayFiltrado,...tweetsInit]
        })
    }, [ tweetsInit ])

    // Use effect cuando hay cambios en newTweets
    useEffect(() => {
        setTweets(tweets => [...newTweets,...tweets])
    }, [ newTweets ])

    const handleNextPage = () => {
        setPage(prevPage => prevPage + 1)
    }

    // se ejecuta cuando se mueve a la parte baja 
    // y ejecuta el paginado una vez
    const debounceHandleNextPage = useCallback(debounce(
        () => handleNextPage(),
        200
    ), [])

    useEffect(() => {
        if( isNearScreen ){
            if(!isLastPage){
                debounceHandleNextPage()
            }
        }
    }, [debounceHandleNextPage, isNearScreen, isLastPage ])

    const handleRetweet = ( retweet ) => {
        setTweetsInit([retweet, ...tweets])
    } 

    return <div>
        <TweetContainer tweets={tweets} handleRetweet={handleRetweet}></TweetContainer>
        { loading && <Loading></Loading>}
        <div id="visor" ref={ externalRef }></div>
    </div>
}

export default TweetHandle