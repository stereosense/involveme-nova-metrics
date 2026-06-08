export default {
    data() {
        return {
            startDate: null,
            endDate: null,
        }
    },

    computed: {
        hasRanges() {
            return this.card.ranges.length > 0
        },

        dateRange: {
            get() {
                return this.startDate && this.endDate ? [this.startDate, this.endDate] : null
            },
            set(val) {
                if (Array.isArray(val) && val.length === 2) {
                    this.startDate = val[0]
                    this.endDate = val[1]
                } else {
                    this.startDate = null
                    this.endDate = null
                }
            },
        },

        presetValues() {
            const today = new Date()

            return this.card.ranges
                .filter(({ value }) => value !== 'ALL')
                .map(({ label, value }) => ({
                    label,
                    value: [this.rangeStartDate(value, today), today],
                }))
        },

        rangeLabel() {
            if (!this.startDate || !this.endDate) {
                return ''
            }

            const sameYear = this.startDate.getFullYear() === this.endDate.getFullYear()
            const format = (date, withYear) => date.toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'short',
                ...(withYear ? { year: 'numeric' } : {}),
            })

            return `${format(this.startDate, !sameYear)} – ${format(this.endDate, true)}`
        },

        dateRangeParams() {
            if (!this.startDate || !this.endDate) {
                return {}
            }

            return {
                startDate: this.startDate.toISOString().split('T')[0],
                endDate: this.endDate.toISOString().split('T')[0],
            }
        },
    },

    methods: {
        rangeStartDate(value, today) {
            if (typeof value === 'number') {
                const start = new Date(today)
                start.setDate(today.getDate() - value + 1)
                return start
            }

            switch (value) {
                case 'TODAY':
                    return new Date(today)
                case 'MTD':
                    return new Date(today.getFullYear(), today.getMonth(), 1)
                case 'QTD':
                    return new Date(today.getFullYear(), Math.floor(today.getMonth() / 3) * 3, 1)
                case 'YTD':
                    return new Date(today.getFullYear(), 0, 1)
                case 'ALL':
                    return new Date(1900, 0, 1)
                default:
                    return null
            }
        },

        initDateRange() {
            const firstRange = this.card.ranges[0]

            if (!firstRange) {
                return
            }

            const selectedValue = this.card.selectedRangeKey ?? firstRange.value
            const start = this.rangeStartDate(selectedValue, new Date())

            if (start) {
                this.startDate = start
                this.endDate = new Date()
            }
        },
    },
}
