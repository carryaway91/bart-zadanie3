import axios from "axios"

export const getImagesFromApi = async(paths: any) => {
    let image: any

    const unfiltered = await Promise.allSettled(
        paths.map(async(path: string) => {
                image = await Promise.allSettled([
                    await axios({
                        method: 'get',
                        url: `http://api.programator.sk/images/272x200/${path}`,
                        responseType: 'blob',
                    })
                    
                ])
            if(image[0].status === 'fulfilled') {
                return {
                    path: path,
                    image: URL.createObjectURL(image[0].value.data)
                }
            } 
        })
        )

        return unfiltered
}