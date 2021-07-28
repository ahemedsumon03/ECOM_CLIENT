class SessionHelper{
    static setAboutSession(JSONData)
    {
        sessionStorage.setItem('SiteInfoAbout',JSONData);
    }

    static getAboutSession()
    {
        return sessionStorage.getItem('SiteInfoAbout');
    }

    static setPolicySession(JSONData)
    {
        sessionStorage.setItem('SiteInfoPolicy',JSONData);
    }

    static getPolicySession()
    {
        return sessionStorage.getItem('SiteInfoPolicy');
    }

    static setPurchaseSession(JSONData)
    {
        sessionStorage.setItem('SiteInfo_purchase_guide',JSONData);
    }

    static getPurchaseSession()
    {
        return sessionStorage.getItem('SiteInfo_purchase_guide');
    }

    static setRefundSession(JSONData)
    {
        sessionStorage.setItem('SiteInfoRefund',JSONData);
    }

    static getRefundSession()
    {
        return sessionStorage.getItem('SiteInfoRefund');
    }

    static setUserName(name)
    {
        sessionStorage.setItem('username',name);
    }

    static getUserName()
    {
        return sessionStorage.getItem('username');
    }

    static removeUserName()
    {
        return sessionStorage.removeItem('username');
    }

    static setPreviouspath(winlocation)
    {
        sessionStorage.setItem('winlocation',winlocation);
    }

    static getPreviouspath()
    {
        return sessionStorage.getItem('winlocation');
    }

}

export default SessionHelper;