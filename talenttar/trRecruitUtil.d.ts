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
declare module Util {
    import IServiceProviderClass = angular.IServiceProviderClass;
    function registerService(name: string, serviceConstructor: Function): void;
    function registerProvider(name: string, serviceProviderConstructor: IServiceProviderClass): void;
}
declare module Util.Models {
    interface IStateService {
        next: ng.ui.IState;
        toParams: ng.ui.IStateParamsService;
    }
}
declare var DEBUG: boolean;
declare module Util.Providers {
    class ConfigurationService {
        private mdThemingProvider;
        static $inject: any[];
        constructor();
        setMdThemingProvider(mdThemingProvider: ng.material.IThemingProvider): void;
        getMdThemingProvider(): ng.material.IThemingProvider;
    }
    class ConfigurationServiceProvider implements ng.IServiceProvider {
        private locationProvider;
        private provide;
        private urlRouterProvider;
        private mdThemingProvider;
        static $inject: string[];
        constructor(locationProvider: ng.ILocationProvider, provide: ng.auto.IProvideService, urlRouterProvider: ng.ui.IUrlRouterProvider, mdThemingProvider: ng.material.IThemingProvider);
        defaultRoute(path: string): void;
        configure(): void;
        $get(): ConfigurationService;
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
    import IClientColorTheme = Util.Models.IClientColorTheme;
    import ConfigurationService = Util.Providers.ConfigurationService;
    class ThemeService {
        protected mdTheming: any;
        protected ConfigurationService: ConfigurationService;
        static $inject: string[];
        constructor(mdTheming: any, ConfigurationService: ConfigurationService);
        applyTheme(clientColorTheme: IClientColorTheme): void;
    }
}
