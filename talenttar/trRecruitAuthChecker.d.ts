///<reference path="trRecruitUtil.d.ts"/>

declare module AuthChecker.Models {
    interface IAuthCheckerConstants {
        ApiEndpoint: string;
        Debug: boolean;
        AuthStates?: any;
    }
}
declare var API_ENDPOINT: string;
declare var DEBUG: boolean;
declare module AuthChecker {
    function registerConfigs(configFunction: Function): void;
    function registerController(name: string, controllerConstructor: Function): void;
    function registerService(name: string, serviceConstructor: Function): void;
}
declare module AuthChecker.Controllers {
    interface IScope extends ng.IScope {
        events: AppController;
    }
    class AppController {
        protected scope: IScope;
        protected window: ng.IWindowService;
        constructor(scope: IScope, window: ng.IWindowService);
    }
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
    import IAuthCheckerConstants = AuthChecker.Models.IAuthCheckerConstants;
    class AuthCheckService {
        private currentUser;
        protected http: ng.IHttpService;
        protected q: ng.IQService;
        protected location: ng.ILocationService;
        protected AuthCheckerConstants: IAuthCheckerConstants;
        static $inject: string[];
        constructor(http: ng.IHttpService, q: ng.IQService, location: ng.ILocationService, AuthCheckerConstants: IAuthCheckerConstants);
        login(credentials: any): ng.IPromise<boolean>;
        logout(): ng.IPromise<boolean>;
        resetPassword(username: string): ng.IPromise<boolean>;
        sendOTP(username: string): ng.IPromise<boolean>;
        getCurrentUser(): ng.IPromise<ISessionUser>;
        refreshCurrentUser(): ng.IPromise<boolean>;
        isUserLoggedIn(): Boolean;
        setClientIdCookie(): ng.IHttpPromise<any>;
        userHasRole(role: string): ng.IPromise<boolean>;
        userHasRolesInList(roles: Array<string>): ng.IPromise<boolean>;
        userHasPermission(permission: string): Boolean;
    }
}
declare module AuthChecker.Services {
    import IStateService = Util.Models.IStateService;
    class UserRedirectionService {
        private window;
        private location;
        private state;
        private AuthCheckService;
        private UserHomePages;
        static $inject: string[];
        constructor(window: ng.IWindowService, location: ng.ILocationService, cookies: ng.cookies.ICookiesService, state: IStateService, AuthCheckService: AuthCheckService);
        redirectToUrl(url: string): void;
        redirectToUserHomePage(): void;
    }
}
declare module AuthChecker.Controllers {
    import AuthCheckService = AuthChecker.Services.AuthCheckService;
    import UserRedirectionService = AuthChecker.Services.UserRedirectionService;
    import IStateService = Util.Models.IStateService;
    import IStateParamsService = ng.ui.IStateParamsService;
    interface IPasswordResetScope extends IScope {
        username: string;
    }
    class PasswordResetController extends AppController {
        protected scope: IPasswordResetScope;
        protected window: ng.IWindowService;
        protected location: ng.ILocationService;
        protected state: IStateService;
        protected stateParams: IStateParamsService;
        protected AuthCheckService: AuthCheckService;
        protected UserRedirectionService: UserRedirectionService;
        static $inject: string[];
        constructor(scope: IPasswordResetScope, window: ng.IWindowService, location: ng.ILocationService, state: IStateService, stateParams: IStateParamsService, AuthCheckService: AuthCheckService, UserRedirectionService: UserRedirectionService);
        onSubmitResetPassword(form: ng.IFormController): void;
    }
}
declare module AuthChecker.Controllers {
    import AuthCheckService = AuthChecker.Services.AuthCheckService;
    import UserRedirectionService = AuthChecker.Services.UserRedirectionService;
    import IStateService = Util.Models.IStateService;
    import IStateParamsService = ng.ui.IStateParamsService;
    interface ILogoutScope extends IScope {
    }
    class LogoutController extends AppController {
        protected scope: ILogoutScope;
        protected window: ng.IWindowService;
        protected location: ng.ILocationService;
        protected state: IStateService;
        protected stateParams: IStateParamsService;
        protected AuthCheckService: AuthCheckService;
        protected UserRedirectionService: UserRedirectionService;
        static $inject: string[];
        constructor(scope: ILogoutScope, window: ng.IWindowService, location: ng.ILocationService, state: IStateService, stateParams: IStateParamsService, AuthCheckService: AuthCheckService, UserRedirectionService: UserRedirectionService);
        doLogout(): void;
    }
}
declare module AuthChecker.Controllers {
    import IAuthCheckerConstants = AuthChecker.Models.IAuthCheckerConstants;
    import IStateService = Util.Models.IStateService;
    import IStateParamsService = ng.ui.IStateParamsService;
    import UserRedirectionService = AuthChecker.Services.UserRedirectionService;
    import AuthCheckService = AuthChecker.Services.AuthCheckService;
    interface IOneTimeLoginPasswordScope extends IScope {
        password: string;
    }
    class OneTimeLoginPasswordController extends AppController {
        protected scope: IOneTimeLoginPasswordScope;
        protected window: ng.IWindowService;
        protected state: IStateService;
        protected stateParams: IStateParamsService;
        protected AuthCheckService: AuthCheckService;
        protected UserRedirectionService: UserRedirectionService;
        protected AuthCheckerConstants: IAuthCheckerConstants;
        static $inject: string[];
        constructor(scope: IOneTimeLoginPasswordScope, window: ng.IWindowService, state: IStateService, stateParams: IStateParamsService, AuthCheckService: AuthCheckService, UserRedirectionService: UserRedirectionService, AuthCheckerConstants: IAuthCheckerConstants);
        onSubmitDoOneTimeLogin(form: ng.IFormController): void;
    }
}
declare module AuthChecker.Controllers {
    import IAuthCheckerConstants = AuthChecker.Models.IAuthCheckerConstants;
    import AuthCheckService = AuthChecker.Services.AuthCheckService;
    import IStateService = Util.Models.IStateService;
    import IStateParamsService = ng.ui.IStateParamsService;
    interface IOneTimeLoginUsernameScope extends IScope {
        username: string;
    }
    class OneTimeLoginUsernameController extends AppController {
        protected scope: IOneTimeLoginUsernameScope;
        protected window: ng.IWindowService;
        protected state: IStateService;
        protected stateParams: IStateParamsService;
        protected AuthCheckService: AuthCheckService;
        protected AuthCheckerConstants: IAuthCheckerConstants;
        static $inject: string[];
        constructor(scope: IOneTimeLoginUsernameScope, window: ng.IWindowService, state: IStateService, stateParams: IStateParamsService, AuthCheckService: AuthCheckService, AuthCheckerConstants: IAuthCheckerConstants);
        onSubmitSendOTP(form: ng.IFormController): void;
    }
}
declare module AuthChecker.Controllers {
    import IAuthCheckerConstants = AuthChecker.Models.IAuthCheckerConstants;
    import AuthCheckService = AuthChecker.Services.AuthCheckService;
    import UserRedirectionService = AuthChecker.Services.UserRedirectionService;
    import IStateService = Util.Models.IStateService;
    import StateTransitionService = Util.Services.StateTransitionService;
    interface IAuthScope extends IScope {
    }
    class AuthController extends AppController {
        protected scope: IAuthScope;
        protected window: ng.IWindowService;
        protected state: IStateService;
        protected StateTransitionService: StateTransitionService;
        protected AuthCheckerConstants: IAuthCheckerConstants;
        static $inject: string[];
        constructor(scope: IAuthScope, window: ng.IWindowService, state: IStateService, StateTransitionService: StateTransitionService, AuthCheckService: AuthCheckService, UserRedirectionService: UserRedirectionService, AuthCheckerConstants: IAuthCheckerConstants);
        isLoading(): boolean;
        getLoadingPercentage(): number;
        onClickBackButton(): void;
        isBackAvailable(): boolean;
    }
}
declare module AuthChecker.Controllers {
    import IAuthCheckerConstants = AuthChecker.Models.IAuthCheckerConstants;
    import IStateService = Util.Models.IStateService;
    import IStateParamsService = ng.ui.IStateParamsService;
    interface IOneTimeLoginScope extends IScope {
    }
    class OneTimeLoginController extends AppController {
        protected scope: IOneTimeLoginScope;
        protected window: ng.IWindowService;
        protected state: IStateService;
        protected AuthCheckerConstants: IAuthCheckerConstants;
        static $inject: string[];
        constructor(scope: IOneTimeLoginScope, window: ng.IWindowService, state: IStateService, stateParams: IStateParamsService, AuthCheckerConstants: IAuthCheckerConstants);
    }
}
declare module AuthChecker.Controllers {
    import AuthCheckService = AuthChecker.Services.AuthCheckService;
    import UserRedirectionService = AuthChecker.Services.UserRedirectionService;
    import IStateService = Util.Models.IStateService;
    import IStateParamsService = ng.ui.IStateParamsService;
    interface ILoginScope extends IScope {
        username: string;
        password: string;
    }
    class LoginController extends AppController {
        protected scope: ILoginScope;
        protected window: ng.IWindowService;
        protected location: ng.ILocationService;
        protected state: IStateService;
        protected stateParams: IStateParamsService;
        protected AuthCheckService: AuthCheckService;
        protected UserRedirectionService: UserRedirectionService;
        static $inject: string[];
        constructor(scope: ILoginScope, window: ng.IWindowService, location: ng.ILocationService, state: IStateService, stateParams: IStateParamsService, AuthCheckService: AuthCheckService, UserRedirectionService: UserRedirectionService);
        onSubmitDoLogin(form: ng.IFormController): void;
    }
}
declare module AuthChecker.Configs {
    import IAuthCheckerConstants = AuthChecker.Models.IAuthCheckerConstants;
    function StateConfig(stateProvider: ng.ui.IStateProvider, AuthCheckerConstants: IAuthCheckerConstants): void;
}
