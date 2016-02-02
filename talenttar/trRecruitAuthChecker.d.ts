/// <reference path="../angular-material/angular-material.d.ts" />
/// <reference path="../angular-ui-router/angular-ui-router.d.ts" />
/// <reference path="../angularjs/angular-mocks.d.ts" />
/// <reference path="../angularjs/angular-route.d.ts" />
/// <reference path="../angularjs/angular-sanitize.d.ts" />
/// <reference path="../angularjs/angular.d.ts" />
/// <reference path="../jquery/jquery.d.ts" />
/// <reference path="../moment/moment-node.d.ts" />
/// <reference path="../moment/moment.d.ts" />
/// <reference path="../ng-file-upload/ng-file-upload.d.ts" />
declare module AuthChecker.Models {
    interface IAppConstants {
        ApiEndpoint: string;
        Debug: boolean;
    }
}
declare var API_ENDPOINT: string;
declare var DEBUG: boolean;
declare module AuthChecker {
    function registerService(name: string, serviceConstructor: Function): void;
}
declare module AuthChecker.Models {
    interface ISessionUser {
        username: string;
        displayName: string;
        defaultRole: string;
        roles: Array<string>;
        permissions: Array<string>;
    }
}
declare module AuthChecker.Services {
    import ISessionUser = AuthChecker.Models.ISessionUser;
    import IAppConstants = AuthChecker.Models.IAppConstants;
    class AuthCheckService {
        private currentUser;
        protected http: ng.IHttpService;
        protected q: ng.IQService;
        protected location: ng.ILocationService;
        protected AppConstants: IAppConstants;
        static $inject: string[];
        constructor(http: ng.IHttpService, q: ng.IQService, location: ng.ILocationService, AppConstants: IAppConstants);
        getCurrentUser(): ng.IPromise<ISessionUser>;
        refreshCurrentUser(): ng.IPromise<boolean>;
        isUserLoggedIn(): Boolean;
        setAnonymousCookie(): ng.IHttpPromise<any>;
        userHasPermission(permission: string): Boolean;
    }
}
