import { GlobalSettings } from '../globalSettings/globalSettings.collection';

export const getDefaultEndpoints = ({ _id }) => {
    if (!Meteor.isServer) throw Meteor.Error(401, 'Not Authorized');

    const fields = {
        'settings.private.defaultEndpoints': 1,
        'settings.private.bfApiHost': 1,
    };

    const { settings: { private: { defaultEndpoints = '', bfApiHost } = {} } = {} } = GlobalSettings.findOne({}, { fields });
    return defaultEndpoints
        .replace(/{BF_API_HOST}/g, bfApiHost)
        .replace(/{BF_PROJECT_ID}/g, _id);
};
