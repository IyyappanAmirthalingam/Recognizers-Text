import { IDatePeriodExtractorConfiguration, IDatePeriodParserConfiguration } from "../baseDatePeriod"
import { BaseDateExtractor, BaseDateParser } from "../baseDate";
import { RegExpUtility } from "@microsoft/recognizers-text";
import { BaseNumberParser, BaseNumberExtractor, EnglishIntegerExtractor, EnglishNumberParserConfiguration } from "@microsoft/recognizers-text-number"
import { BaseDurationExtractor, BaseDurationParser } from "../baseDuration"
import { BaseDateTime } from "../../resources/baseDateTime"
import { EnglishDateTime } from "../../resources/englishDateTime";
import { EnglishCommonDateTimeParserConfiguration } from "./baseConfiguration"
import { EnglishDurationExtractorConfiguration } from "./durationConfiguration"
import { EnglishDateExtractorConfiguration } from "./dateConfiguration"
import { IDateTimeExtractor } from "../baseDateTime";

export class EnglishDatePeriodExtractorConfiguration implements IDatePeriodExtractorConfiguration {
    readonly simpleCasesRegexes: RegExp[]
    readonly illegalYearRegex: RegExp
    readonly YearRegex: RegExp
    readonly tillRegex: RegExp
    readonly followedUnit: RegExp
    readonly numberCombinedWithUnit: RegExp
    readonly pastRegex: RegExp
    readonly futureRegex: RegExp
    readonly weekOfRegex: RegExp
    readonly monthOfRegex: RegExp
    readonly dateUnitRegex: RegExp
    readonly inConnectorRegex: RegExp
    readonly rangeUnitRegex: RegExp
    readonly datePointExtractor: IDateTimeExtractor
    readonly integerExtractor: BaseNumberExtractor
    readonly numberParser: BaseNumberParser
    readonly durationExtractor: IDateTimeExtractor
    readonly rangeConnectorRegex: RegExp

    constructor() {
        this.simpleCasesRegexes = [
            RegExpUtility.getSafeRegExp(EnglishDateTime.SimpleCasesRegex),
            RegExpUtility.getSafeRegExp(EnglishDateTime.BetweenRegex),
            RegExpUtility.getSafeRegExp(EnglishDateTime.OneWordPeriodRegex),
            RegExpUtility.getSafeRegExp(EnglishDateTime.MonthWithYear),
            RegExpUtility.getSafeRegExp(EnglishDateTime.MonthNumWithYear),
            RegExpUtility.getSafeRegExp(EnglishDateTime.YearRegex),
            RegExpUtility.getSafeRegExp(EnglishDateTime.WeekOfMonthRegex),
            RegExpUtility.getSafeRegExp(EnglishDateTime.WeekOfYearRegex),
            RegExpUtility.getSafeRegExp(EnglishDateTime.MonthFrontBetweenRegex),
            RegExpUtility.getSafeRegExp(EnglishDateTime.MonthFrontSimpleCasesRegex),
            RegExpUtility.getSafeRegExp(EnglishDateTime.QuarterRegex),
            RegExpUtility.getSafeRegExp(EnglishDateTime.QuarterRegexYearFront),
            RegExpUtility.getSafeRegExp(EnglishDateTime.AllHalfYearRegex),
            RegExpUtility.getSafeRegExp(EnglishDateTime.SeasonRegex),
            RegExpUtility.getSafeRegExp(EnglishDateTime.WhichWeekRegex),
            RegExpUtility.getSafeRegExp(EnglishDateTime.RestOfDateRegex),
            RegExpUtility.getSafeRegExp(EnglishDateTime.LaterEarlyPeriodRegex),
            RegExpUtility.getSafeRegExp(EnglishDateTime.WeekWithWeekDayRangeRegex)
        ];
        this.illegalYearRegex = RegExpUtility.getSafeRegExp(BaseDateTime.IllegalYearRegex);
        this.YearRegex = RegExpUtility.getSafeRegExp(EnglishDateTime.YearRegex);
        this.tillRegex = RegExpUtility.getSafeRegExp(EnglishDateTime.TillRegex);
        this.followedUnit = RegExpUtility.getSafeRegExp(EnglishDateTime.FollowedDateUnit);
        this.numberCombinedWithUnit = RegExpUtility.getSafeRegExp(EnglishDateTime.NumberCombinedWithDateUnit);
        this.pastRegex = RegExpUtility.getSafeRegExp(EnglishDateTime.PastPrefixRegex);
        this.futureRegex = RegExpUtility.getSafeRegExp(EnglishDateTime.NextPrefixRegex);
        this.weekOfRegex = RegExpUtility.getSafeRegExp(EnglishDateTime.WeekOfRegex);
        this.monthOfRegex = RegExpUtility.getSafeRegExp(EnglishDateTime.MonthOfRegex);
        this.dateUnitRegex = RegExpUtility.getSafeRegExp(EnglishDateTime.DateUnitRegex);
        this.inConnectorRegex = RegExpUtility.getSafeRegExp(EnglishDateTime.InConnectorRegex);
        this.rangeUnitRegex = RegExpUtility.getSafeRegExp(EnglishDateTime.RangeUnitRegex);
        this.datePointExtractor = new BaseDateExtractor(new EnglishDateExtractorConfiguration());
        this.integerExtractor = new EnglishIntegerExtractor();
        this.numberParser = new BaseNumberParser(new EnglishNumberParserConfiguration());
        this.durationExtractor = new BaseDurationExtractor(new EnglishDurationExtractorConfiguration());
        this.rangeConnectorRegex = RegExpUtility.getSafeRegExp(EnglishDateTime.RangeConnectorRegex);
    }

    getFromTokenIndex(source: string) {
        let result = { matched: false, index: -1 };
        if (source.endsWith("from")) {
            result.index = source.lastIndexOf("from");
            result.matched = true;
        }
        return result;
    };

    getBetweenTokenIndex(source: string) {
        let result = { matched: false, index: -1 };
        if (source.endsWith("between")) {
            result.index = source.lastIndexOf("between");
            result.matched = true;
        }
        return result;
    };

    hasConnectorToken(source: string): boolean {
        let match = RegExpUtility.getMatches(this.rangeConnectorRegex, source).pop();
        return match && match.length === source.length;
    };
}

export class EnglishDatePeriodParserConfiguration implements IDatePeriodParserConfiguration {
    readonly dateExtractor: IDateTimeExtractor
    readonly dateParser: BaseDateParser
    readonly durationExtractor: IDateTimeExtractor
    readonly durationParser: BaseDurationParser
    readonly monthFrontBetweenRegex: RegExp
    readonly betweenRegex: RegExp
    readonly monthFrontSimpleCasesRegex: RegExp
    readonly simpleCasesRegex: RegExp
    readonly oneWordPeriodRegex: RegExp
    readonly monthWithYear: RegExp
    readonly monthNumWithYear: RegExp
    readonly yearRegex: RegExp
    readonly pastRegex: RegExp
    readonly futureRegex: RegExp
    readonly inConnectorRegex: RegExp
    readonly weekOfMonthRegex: RegExp
    readonly weekOfYearRegex: RegExp
    readonly quarterRegex: RegExp
    readonly quarterRegexYearFront: RegExp
    readonly allHalfYearRegex: RegExp
    readonly seasonRegex: RegExp
    readonly weekOfRegex: RegExp
    readonly monthOfRegex: RegExp
    readonly whichWeekRegex: RegExp
    readonly nextPrefixRegex: RegExp
    readonly pastPrefixRegex: RegExp
    readonly thisPrefixRegex: RegExp
    readonly restOfDateRegex : RegExp
    readonly laterEarlyPeriodRegex: RegExp
    readonly weekWithWeekDayRangeRegex: RegExp
    readonly unspecificEndOfRangeRegex: RegExp
    readonly tokenBeforeDate: string
    readonly dayOfMonth: ReadonlyMap<string, number>
    readonly monthOfYear: ReadonlyMap<string, number>
    readonly cardinalMap: ReadonlyMap<string, number>
    readonly seasonMap: ReadonlyMap<string, string>
    readonly unitMap: ReadonlyMap<string, string>
    
    constructor(config: EnglishCommonDateTimeParserConfiguration) {
        this.dateExtractor = config.dateExtractor;
        this.dateParser = config.dateParser;
        this.durationExtractor = config.durationExtractor;
        this.durationParser = config.durationParser;
        this.monthFrontBetweenRegex = RegExpUtility.getSafeRegExp(EnglishDateTime.MonthFrontBetweenRegex);
        this.betweenRegex = RegExpUtility.getSafeRegExp(EnglishDateTime.BetweenRegex);
        this.monthFrontSimpleCasesRegex = RegExpUtility.getSafeRegExp(EnglishDateTime.MonthFrontSimpleCasesRegex);
        this.simpleCasesRegex = RegExpUtility.getSafeRegExp(EnglishDateTime.SimpleCasesRegex);
        this.oneWordPeriodRegex = RegExpUtility.getSafeRegExp(EnglishDateTime.OneWordPeriodRegex);
        this.monthWithYear = RegExpUtility.getSafeRegExp(EnglishDateTime.MonthWithYear);
        this.monthNumWithYear = RegExpUtility.getSafeRegExp(EnglishDateTime.MonthNumWithYear);
        this.yearRegex = RegExpUtility.getSafeRegExp(EnglishDateTime.YearRegex);
        this.pastRegex = RegExpUtility.getSafeRegExp(EnglishDateTime.PastPrefixRegex);
        this.futureRegex = RegExpUtility.getSafeRegExp(EnglishDateTime.NextPrefixRegex);
        this.inConnectorRegex = config.utilityConfiguration.inConnectorRegex;
        this.weekOfMonthRegex = RegExpUtility.getSafeRegExp(EnglishDateTime.WeekOfMonthRegex);
        this.weekOfYearRegex = RegExpUtility.getSafeRegExp(EnglishDateTime.WeekOfYearRegex);
        this.quarterRegex = RegExpUtility.getSafeRegExp(EnglishDateTime.QuarterRegex);
        this.quarterRegexYearFront = RegExpUtility.getSafeRegExp(EnglishDateTime.QuarterRegexYearFront);
        this.allHalfYearRegex = RegExpUtility.getSafeRegExp(EnglishDateTime.AllHalfYearRegex);
        this.seasonRegex = RegExpUtility.getSafeRegExp(EnglishDateTime.SeasonRegex);
        this.weekOfRegex = RegExpUtility.getSafeRegExp(EnglishDateTime.WeekOfRegex);
        this.monthOfRegex = RegExpUtility.getSafeRegExp(EnglishDateTime.MonthOfRegex);
        this.whichWeekRegex = RegExpUtility.getSafeRegExp(EnglishDateTime.WhichWeekRegex);
        this.nextPrefixRegex = RegExpUtility.getSafeRegExp(EnglishDateTime.NextPrefixRegex);
        this.pastPrefixRegex = RegExpUtility.getSafeRegExp(EnglishDateTime.PastPrefixRegex);
        this.thisPrefixRegex = RegExpUtility.getSafeRegExp(EnglishDateTime.ThisPrefixRegex);
        this.restOfDateRegex = RegExpUtility.getSafeRegExp(EnglishDateTime.RestOfDateRegex);
        this.laterEarlyPeriodRegex = RegExpUtility.getSafeRegExp(EnglishDateTime.LaterEarlyPeriodRegex);
        this.weekWithWeekDayRangeRegex = RegExpUtility.getSafeRegExp(EnglishDateTime.WeekWithWeekDayRangeRegex);
        this.unspecificEndOfRangeRegex = RegExpUtility.getSafeRegExp(EnglishDateTime.UnspecificEndOfRangeRegex);
        this.tokenBeforeDate = EnglishDateTime.TokenBeforeDate;
        this.dayOfMonth = config.dayOfMonth;
        this.monthOfYear = config.monthOfYear;
        this.cardinalMap = config.cardinalMap;
        this.seasonMap = config.seasonMap;
        this.unitMap = config.unitMap;
    }

    getSwiftDayOrMonth(source: string): number {
        let trimmedSource = source.trim().toLowerCase();
        let swift = 0;
        if (RegExpUtility.getMatches(this.nextPrefixRegex, trimmedSource).length > 0) {
            swift = 1;
        } else if (RegExpUtility.getMatches(this.pastPrefixRegex, trimmedSource).length > 0) {
            swift = -1;
        }
        return swift;
    }

    getSwiftYear(source: string): number {
        let trimmedSource = source.trim().toLowerCase();
        let swift = -10;
        if (RegExpUtility.getMatches(this.nextPrefixRegex, trimmedSource).length > 0) {
            swift = 1;
        } else if (RegExpUtility.getMatches(this.pastPrefixRegex, trimmedSource).length > 0) {
            swift = -1;
        } else if (RegExpUtility.getMatches(this.thisPrefixRegex, trimmedSource).length > 0) {
            swift = 0;
        }
        return swift;
    }

    isFuture(source: string): boolean {
        let trimmedSource = source.trim().toLowerCase();
        return (trimmedSource.startsWith('this') || trimmedSource.startsWith('next'));
    }

    isYearToDate(source: string): boolean {
        let trimmedSource = source.trim().toLowerCase();
        return trimmedSource === 'year to date';
    }

    isMonthToDate(source: string): boolean {
        let trimmedSource = source.trim().toLowerCase();
        return trimmedSource === 'month to date';
    }

    isWeekOnly(source: string): boolean {
        let trimmedSource = source.trim().toLowerCase();
        return trimmedSource.endsWith('week');
    }

    isWeekend(source: string): boolean {
        let trimmedSource = source.trim().toLowerCase();
        return trimmedSource.endsWith('weekend');
    }

    isMonthOnly(source: string): boolean {
        let trimmedSource = source.trim().toLowerCase();
        return trimmedSource.endsWith('month');
    }

    isYearOnly(source: string): boolean {
        let trimmedSource = source.trim().toLowerCase();
        return trimmedSource.endsWith('year') || (trimmedSource.endsWith('y') && RegExpUtility.isMatch(this.unspecificEndOfRangeRegex, trimmedSource));
    }

    isLastCardinal(source: string): boolean {
        let trimmedSource = source.trim().toLowerCase();
        return trimmedSource === 'last';
    }
}
