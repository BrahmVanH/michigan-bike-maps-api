import GeoJSONLineStringType from '@/entities/LineString';
import GeoJSONPointType from '@/entities/Point';
import { TrackPropertiesType } from '@/entities/Track';
import { TrackProperties } from '@/generated/graphql';
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { BaseContext } from '@apollo/server';
import AppDataSource from 'database/dataSource.mts';

export interface CustomContext extends BaseContext {
	dataSource?: typeof AppDataSource;
}

export type S3Object = {
	Key: string;
	LastModified: Date;
	ETag: string;
	ChecksumAlgorithm: string[]; // You might want to specify the actual type here
	Size: number;
	StorageClass: string;
};

export interface TrackConstructorInit {
	name: string;
	description: string;
	recordedAt: Date;
	route: GeoJSONLineStringType;
	startPoint: GeoJSONPointType;
	endPoint: GeoJSONPointType;
	properties: TrackPropertiesType;
	tags: string[];
}


