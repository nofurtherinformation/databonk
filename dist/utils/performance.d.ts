export declare class PerformanceTimer {
    private startTime;
    private measurements;
    start(): void;
    end(label: string): number;
    measure<T>(label: string, fn: () => T): T;
    measureAsync<T>(label: string, fn: () => Promise<T>): Promise<T>;
    getMeasurement(label: string): number | undefined;
    getAllMeasurements(): Record<string, number>;
    formatTime(ms: number): string;
    printSummary(): void;
    reset(): void;
}
export declare class DataGenerator {
    private static randomInt;
    private static randomFloat;
    static generatePopulationData(count: number): Array<{
        id: number;
        population1: number;
        population2: number;
        population3: number;
    }>;
    static generateCategoryData(populationCount: number): Array<{
        id: number;
        category: string;
    }>;
    static generateLargeDataset(populationRows: number, options?: {
        includeNulls?: boolean;
        nullPercentage?: number;
        skewCategories?: boolean;
    }): {
        populationData: ReturnType<typeof DataGenerator.generatePopulationData>;
        categoryData: ReturnType<typeof DataGenerator.generateCategoryData>;
    };
}
export declare class MemoryProfiler {
    private initialMemory;
    start(): void;
    getMemoryUsage(): number;
    getCurrentUsage(): number;
    formatBytes(bytes: number): string;
    end(): string;
}
//# sourceMappingURL=performance.d.ts.map