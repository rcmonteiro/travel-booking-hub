export abstract class ValueObject<Props> {
  protected props: Props

  protected constructor(props: Props) {
    this.props = props
  }

  public equals(vo: ValueObject<Props>): boolean {
    if (vo === null || vo === undefined || vo.props === undefined) return false
    return JSON.stringify(this.props) === JSON.stringify(vo.props)
  }
}