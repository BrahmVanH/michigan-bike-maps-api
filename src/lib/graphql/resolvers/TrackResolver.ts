import { Resolver, Query } from 'type-graphql';
import TrackORM from '@models/Track';

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
}
