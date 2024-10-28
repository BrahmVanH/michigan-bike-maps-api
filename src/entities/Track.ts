import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, Index, BaseEntity, OneToMany } from 'typeorm';
import { Point, LineString } from 'geojson';
import { ObjectType, Field, ID } from 'type-graphql';
import GeoJSONLineStringType from './LineString';
import GeoJSONPointType from './Point';
import { TrackConstructorInit } from '@/types/types';
import TrackPointType from './Point';

// @ObjectType('TrackProperties')
// export class TrackPropertiesType {
// 	@Field(() => [Number])
// 	elevations: number[];

// 	@Field(() => [String])
// 	timestamps: string[];

// 	@Field()
// 	distance: number;

// 	@Field()
// 	duration: number;

// 	@Field({ nullable: true })
// 	avgSpeed?: number;
// }

// @Entity('tracks')
// @ObjectType()
// export default class TrackORM extends BaseEntity {
// 	@Field(() => ID)
// 	@PrimaryGeneratedColumn('uuid')
// 	id: string;

// 	@Field(() => String)
// 	@Column('text')
// 	name: string;

// 	@Field(() => Date)
// 	@CreateDateColumn()
// 	recordedAt: Date;

// 	// The actual GPS track
// 	@Field(() => GeoJSONLineStringType)
// 	@Column('geometry', {
// 		spatialFeatureType: 'LineString',
// 		srid: 4326, // WGS84 coordinate system
// 	})
// 	@Index({ spatial: true })
// 	route: LineString;

// 	@Field(() => TrackPropertiesType, { nullable: true })
// 	@Column('jsonb', { nullable: true })
// 	properties: {
// 		elevations: number[];
// 		timestamps: string[];
// 		distance: number;
// 		duration: number;
// 		avgSpeed?: number;
// 	};

// 	@Field(() => GeoJSONPointType)
// 	@Column('geometry', {
// 		spatialFeatureType: 'Point',
// 		srid: 4326,
// 	})
// 	@Index({ spatial: true })
// 	startPoint: Point;

// 	@Field(() => GeoJSONPointType)
// 	@Column('geometry', {
// 		spatialFeatureType: 'Point',
// 		srid: 4326,
// 	})
// 	@Index({ spatial: true })
// 	endPoint: Point;

// 	@Field(() => String, { nullable: true })
// 	@Column('text', { nullable: true })
// 	description?: string;

// 	@Field(() => [String])
// 	@Column('text', { array: true, default: [] })
// 	tags: string[];

// }

@Entity('tracks')
@ObjectType()
export default class TrackORM extends BaseEntity {
	@Field(() => ID)
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Field(() => String)
	@Column('text')
	name: string;

	@Field(() => String)
	@Column('text', { nullable: true })
	description: string;

	@Field(() => Date)
	@CreateDateColumn()
	createdAt: Date;

	@Field(() => [TrackPointType])
	@OneToMany((type) => TrackPointType, (trackPoint) => trackPoint.track, { cascade: true })
	trackPoints: TrackPointType[];
}
