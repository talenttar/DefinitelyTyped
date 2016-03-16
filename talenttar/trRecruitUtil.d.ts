///<reference path="../angularjs/angular.d.ts"/>
///<reference path="../angularjs/angular-cookies.d.ts"/>
///<reference path="../angular-material/angular-material.d.ts"/>
///<reference path="../angular-ui-router/angular-ui-router.d.ts"/>

declare var API_ENDPOINT: string;
declare var DEBUG: boolean;
declare module Util {
    import IServiceProviderClass = angular.IServiceProviderClass;
    function registerConfigs(configFunction: Function): void;
    function registerController(name: string, controllerConstructor: Function): void;
    function registerService(name: string, serviceConstructor: Function): void;
    function registerFactory(name: string, inlineAnnotatedFunction: Function): void;
    function registerProvider(name: string, serviceProviderConstructor: IServiceProviderClass): void;
}
declare module Util.Controllers {
    interface IScope extends ng.IScope {
        events: AppController;
    }
    class AppController {
        protected scope: IScope;
        protected window: ng.IWindowService;
        constructor(scope: IScope, window: ng.IWindowService);
    }
}
declare module Util.Controllers {
    interface IErrorScope extends IScope {
        currentYear: string;
    }
    class ErrorController extends AppController {
        protected scope: IErrorScope;
        protected window: ng.IWindowService;
        static $inject: string[];
        constructor(scope: IErrorScope, window: ng.IWindowService);
        onClickBackButton(): void;
    }
}
declare module Util.Models {
    interface IStateService extends ng.ui.IStateService {
        next: ng.ui.IState;
        toParams: ng.ui.IStateParamsService;
    }
}
declare module Util.Models {
    interface IClientColorDefinition {
        name?: string;
        paletteName?: string;
        paletteDefinition?: any;
        hueDefinition?: ng.material.IThemeHues;
    }
    interface IClientColorTheme {
        primary: IClientColorDefinition;
        accent: IClientColorDefinition;
        warn: IClientColorDefinition;
        background: IClientColorDefinition;
    }
    interface IThemingProvider extends ng.material.IThemingProvider {
        generateThemesOnDemand(onDemand: boolean): any;
    }
}
declare var DEBUG: boolean;
declare module Util.Providers {
    import IThemingProvider = Util.Models.IThemingProvider;
    class ConfigurationService {
        private mdThemingProvider;
        static $inject: any[];
        constructor();
        setMdThemingProvider(mdThemingProvider: IThemingProvider): void;
        getMdThemingProvider(): IThemingProvider;
    }
    class ConfigurationServiceProvider implements ng.IServiceProvider {
        private locationProvider;
        private provide;
        private urlRouterProvider;
        private mdThemingProvider;
        private httpProvider;
        static $inject: string[];
        constructor(locationProvider: ng.ILocationProvider, provide: ng.auto.IProvideService, urlRouterProvider: ng.ui.IUrlRouterProvider, mdThemingProvider: IThemingProvider, httpProvider: ng.IHttpProvider);
        defaultRoute(path: string): void;
        configure(): void;
        $get(): ConfigurationService;
    }
}
declare module Util.Models {
    interface IUtilConstants {
        ApiEndpoint: string;
        Debug: boolean;
        ErrorStates?: any;
    }
}
declare module Util.Models {
    interface IRequiredCompatible {
        browser: Boolean;
    }
    interface IOptionalCompatible {
    }
    interface ICompatible {
        required: IRequiredCompatible;
        optional: IOptionalCompatible;
    }
}
declare module Util.Models {
    interface IClientDetails {
        id: number;
        name: string;
    }
}
declare module Util.Configs {
    import IUtilConstants = Util.Models.IUtilConstants;
    function StateConfig(stateProvider: ng.ui.IStateProvider, UtilConstants: IUtilConstants): void;
}
declare module Util.Interceptors {
    import IUtilConstants = Util.Models.IUtilConstants;
    function SecurityInterceptor(injector: ng.auto.IInjectorService, location: ng.ILocationService, UtilConstants: IUtilConstants): ng.IHttpInterceptor;
}
declare module Util.Services {
    import ICompatible = Util.Models.ICompatible;
    class CompatibilityService {
        protected q: ng.IQService;
        protected timeout: ng.ITimeoutService;
        protected deviceDetector: any;
        protected compatibility: ICompatible;
        static minSupportedBrowserVersions: {
            chrome: string;
            firefox: string;
            opera: string;
            safari: string;
        };
        static $inject: string[];
        constructor(q: ng.IQService, timeout: ng.ITimeoutService, deviceDetector: any);
        private _browserVersionGreaterThan(minVersion);
        isBrowserCompatible(): Boolean;
        runCompatibilityChecker(): void;
        isRequiredPassed(): Boolean;
    }
}
declare module Util.Services {
    class StateTransitionService {
        protected rootScope: ng.IRootScopeService;
        protected state: ng.ui.IStateService;
        protected timeout: ng.ITimeoutService;
        protected interval: ng.IIntervalService;
        protected loading: boolean;
        protected loadingPercentage: number;
        private loadingIntervalPromise;
        static $inject: string[];
        constructor(rootScope: ng.IRootScopeService, state: ng.ui.IStateService, interval: ng.IIntervalService, timeout: ng.ITimeoutService);
        isLoading(): boolean;
        getLoadingPercentage(): number;
        runTransitionRules(): void;
    }
}
declare module Util.Services.Data {
    import IClientColorTheme = Util.Models.IClientColorTheme;
    import IUtilConstants = Util.Models.IUtilConstants;
    import IClientDetails = Util.Models.IClientDetails;
    class ClientDataService {
        protected http: ng.IHttpService;
        protected UtilConstants: IUtilConstants;
        static $inject: string[];
        constructor(http: ng.IHttpService, UtilConstants: IUtilConstants);
        getClientDetails(): ng.IPromise<IClientDetails>;
        isCareerPortalEnabled(): ng.IPromise<boolean>;
        isReferralPortalEnabled(): ng.IPromise<boolean>;
        getLogoUrl(): string;
        getFaviconUrl(): string;
        getColorTheme(): ng.IPromise<IClientColorTheme>;
    }
}
declare module Util.Services {
    import IClientColorTheme = Util.Models.IClientColorTheme;
    import ConfigurationService = Util.Providers.ConfigurationService;
    class ThemeService {
        protected cookies: ng.cookies.ICookiesService;
        protected mdTheming: any;
        protected ConfigurationService: ConfigurationService;
        static $inject: string[];
        constructor(cookies: ng.cookies.ICookiesService, mdTheming: any, ConfigurationService: ConfigurationService);
        applyTheme(clientColorTheme: IClientColorTheme): void;
    }
}
