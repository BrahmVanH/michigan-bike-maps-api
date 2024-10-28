import { Resolver, Query, Mutation, ArgsType, Field, InputType, Ctx, Arg } from 'type-graphql';
import TrackORM, { TrackPropertiesType } from '@/entities/Track';
import GeoJSONLineStringType from '@/entities/LineString';
import GeoJSONPointType from '@/entities/Point';
import { CustomContext, TrackConstructorInit } from '@/types/types';

// @InputType()
// class GeoJSONLineStringInput implements GeoJSONLineStringType {
// 	@Field(() => [[Number]])
// 	coordinates: number[][];

// 	@Field(() => String)
// 	type = 'LineString' as const;
// }

// @InputType()
// class GeoJSONPointInput implements Partial<GeoJSONPointType> {
// 	@Field(() => [Number])
// 	coordinates: number[];

// 	@Field(() => String)
// 	type = 'Point' as const;
// }

// @InputType()
// class TrackPropertiesInput implements Partial<TrackPropertiesType> {
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

// @InputType()
// class CreateTrackInput implements Partial<TrackORM> {
// 	@Field()
// 	name: string;

// 	@Field()
// 	description: string;

// 	@Field()
// 	recordedAt: Date;

// 	@Field(() => GeoJSONLineStringInput)
// 	route: GeoJSONLineStringInput;

// 	@Field(() => GeoJSONPointInput)
// 	startPoint: GeoJSONPointInput;

// 	@Field(() => GeoJSONPointInput)
// 	endPoint: GeoJSONPointInput;

// 	@Field(() => TrackPropertiesInput)
// 	properties: TrackPropertiesInput;

// 	@Field(() => [String])
// 	tags: string[];
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

// 	@Field(() => String)
// 	@Column('text', { nullable: true })
// 	description: string;

// 	@Field(() => Date)
// 	@CreateDateColumn()
// 	createdAt: Date;

// 	@Field()
// 	@OneToMany((type) => TrackPointType, (trackPoint) => trackPoint.track, { cascade: true })
// 	trackPoints: TrackPointType[];
// }

@InputType()
class TrackPointInput {

	@Field(() => Number)
	latitude: number;
	
	@Field(() => Number)
	longitude: number;

	@Field(() => Number)
	elevation: number;

	@Field(() => Date)
	timestamp: Date;
}
@InputType()
class CreateTrackInput {
	@Field()
	name: string;

	@Field()
	description: string;

	@Field()
	createAt: Date;

	@Field()
	trackPoints: TrackPointInput[];
}

@Resolver(() => TrackORM)
export class TrackResolver {
	@Query(() => [TrackORM])
	async tracks(): Promise<TrackORM[]> {
		return await TrackORM.find();
	}

	@Query(() => TrackORM, { nullable: true })
	async track(id: string): Promise<TrackORM | null> {
		return await TrackORM.findOneBy({ id });
	}

	@Mutation()
	async createTrack(@Arg('data') newTrackData: CreateTrackInput, @Ctx() ctx: CustomContext): Promise<TrackORM> {
		
		const newTrackValues = [
			{
				name: newTrackData.name,
				description: newTrackData.description,
				recordedAt: newTrackData.recordedAt,
				route: route,
				startPoint: start,
				endPoint: end,
				properties: properties,
				tags: newTrackData.tags,
			},
		];

		if (!ctx.dataSource) {
			throw new Error('No data source found');
		}

		return await ctx.dataSource.createQueryBuilder().insert().into(TrackORM).values(newTrackValues).execute();
	}
}
