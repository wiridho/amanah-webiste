import axios from 'axios';
import apiConfig from '../api/apiConfig';

export const generateDynamicLink = async (token, userId) => {
    try {
        const { data } = await axios.post(apiConfig.firebaseDynamicLinkUrl, {
            dynamicLinkInfo: {
                domainUriPrefix: apiConfig.deepLinkDomainUri,
                link: `${
                    apiConfig.deepLinkUrl
                }?token=${token}&uid=${userId.toString()}`,
                androidInfo: {
                    androidPackageName: apiConfig.androidPackageName,
                },
            },
        });
        return data;
    } catch (error) {
        console.log('ERROR GENERATE DYNAMIC LINK', error);
    }
};
