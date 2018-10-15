export enum CMSSlots {
    HEADER = 'Header',
    FOOTER = 'Footer',
    CONTENT = 'Content',
    TOP_CONTENT = 'TopContent',
    LEFT_CONTENT = 'LeftContent',
    RIGHT_CONTENT = 'RightContent',
    BOTTOM_CONTENT = 'BottomContent',
    NAVIGATION = 'Navigation'
}

export enum CMSPositions {
    TOP = 'top',
    BOTTOM = 'bottom'
}

export enum CMSComponents {
    HEADER = 'CMSHeaderComponent',
    FOOTER = 'FooterComponent',
    NAVIGATION = 'NavigationComponent',
    TEXT_IMAGE = 'CMSTextImageComponent',
    PRODUCT = 'ProductComponent'
}

export enum CMSTemplates {
    LANDING_PAGE = 'LandingPageTemplate',
    CONTENT_PAGE = 'ContentPageTemplate',
    TWO_COLUMNS_PAGE = 'ContentPage2ColumnsTemplate'
}

export default {
    CMSSlots,
    CMSComponents,
    CMSPositions,
    CMSTemplates
};
